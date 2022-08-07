import {Injectable} from '@nestjs/common'
import {Inject} from '@nestjs/common'
import {plainToClass} from 'class-transformer'
import {randomUUID} from 'crypto'

import {Service} from '../../common/interfaces/service'
import {EntityInvalidError} from '../../common/errors/entity-invalid.error'
import {EntityErrors} from '../../common/helpers/entity-errors'

import {ListUsersService} from '../../users/services/list-users.service'
import {InviteUserService} from '../../users/services/invite-user.service'
import {UsersRepositoryQueryDto} from '../../users/dtos/users.repository-query.dto'
import {UserDto} from '../../users/dtos/user.dto'

import {Invitation} from '../entities/invitation.entity'
import {InvitationRepository} from '../repositories/invitation.repository'
import {CreateMassiveInvitationsEntryDto} from '../dtos/create-massive-invitations-entry.dto'
import {INVITATION_ROLES} from '../invitations.constants'
import {CreateInvitationService} from './create-invitation.service'

@Injectable()
export class CreateMassiveInvitationsService implements Service {
  constructor(
    @Inject(InvitationRepository)
    private readonly invitationRepository: InvitationRepository,
    private readonly listUsersService: ListUsersService,
    private readonly createInvitationService: CreateInvitationService,
  ) {}

  async run(data: CreateMassiveInvitationsEntryDto) {
    const invitations: Invitation[] =
      await this.invitationRepository.findByEmails(data.emails)

    const query = plainToClass(UsersRepositoryQueryDto, {
      filter: {emails: data.emails},
    })
    const users = (await this.listUsersService.run(query)).data

    const errors = new EntityErrors()

    if (!data.role) {
      errors.addError('role', 'blank')
    } else if (!this.isValidRole(data.role)) {
      errors.addError('role', 'invalid')
    }

    data.emails.forEach(email => {
      if (
        users.find(user => user.email === email) ||
        invitations.find(invitation => invitation.email === email)
      ) {
        errors.addError('emails', 'taken', {value: email})
      }
    })

    if (errors.hasErrors()) throw new EntityInvalidError(errors)

    await Promise.all(
      data.emails.map(email => {
        return this.createInvitationService.run(
          plainToClass(UserDto, {
            id: randomUUID(),
            email,
            role: data.role,
          }),
        )
      }),
    )
  }

  private isValidRole(role: string) {
    return Object.values(INVITATION_ROLES).includes(role as INVITATION_ROLES)
  }
}
