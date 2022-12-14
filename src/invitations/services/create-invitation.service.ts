import {ConflictException, Inject, Injectable} from '@nestjs/common'
import {plainToClass} from 'class-transformer'
import {randomUUID} from 'crypto'

import {Service} from '../../common/interfaces/service'
import {EntityInvalidError} from '../../common/errors/entity-invalid.error'
import {EntityErrors} from '../../common/helpers/entity-errors'
import {EntityMapper} from '../../common/helpers/entity-mapper'
import {Transaction} from '../../common/decorators/transaction.decorator'

import {Invitation} from '../entities/invitation.entity'
import {CreateInvitationDto} from '../dtos/create-invitation.dto'
import {InvitationRepository} from '../repositories/invitation.repository'

import {InviteUserService} from 'src/users/services/invite-user.service'
import {UserDto} from '../../users/dtos/user.dto'
import {PG_CONFLICT_ERROR_CODE} from 'src/common/common.constants'

@Injectable()
export class CreateInvitationService implements Service {
  constructor(
    @Inject(InvitationRepository)
    private readonly invitationRepository: InvitationRepository,
    private readonly inviteUserService: InviteUserService,
  ) {}

  @Transaction()
  async run(createInvitationDto: CreateInvitationDto) {
    let errors: EntityErrors = new EntityErrors()
    let invitation: Invitation = null

    try {
      invitation = await EntityMapper.dtoToEntity(
        Invitation,
        createInvitationDto,
      )
    } catch (err) {
      errors = err.errors
    }

    if (errors.hasErrors()) throw new EntityInvalidError(errors)

    try {
      await this.invitationRepository.create(invitation)

      await this.inviteUserService.run(
        plainToClass(UserDto, {
          id: randomUUID(),
          email: invitation.email,
          role: invitation.role,
        }),
      )
    } catch (err) {
      if (err.code === PG_CONFLICT_ERROR_CODE) {
        throw new ConflictException('Invitation conflict')
      }

      throw err
    }

    return Promise.resolve()
  }
}
