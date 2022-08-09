import {ConflictException, Inject, Injectable} from '@nestjs/common'
import {plainToClass} from 'class-transformer'

import {Service} from '../../common/interfaces/service'
import {Transaction} from '../../common/decorators/transaction.decorator'

import {AcceptInvitationDto} from '../dtos/accept-invitation.dto'
import {InvitationRepository} from '../repositories/invitation.repository'

import {ListUsersService} from '../../users/services/list-users.service'
import {UpdateUserPasswordService} from '../../auth/services/update-user-password.service'
import {UsersRepositoryQueryDto} from 'src/users/dtos/users.repository-query.dto'
import {UpdateUserPasswordDto} from 'src/auth/dtos/update-user-password.dto'

@Injectable()
export class AcceptInvitationService implements Service {
  constructor(
    @Inject(InvitationRepository)
    private readonly invitationRepository: InvitationRepository,
    private readonly listUsersService: ListUsersService,
    private readonly updateUserPasswordService: UpdateUserPasswordService,
  ) {}

  @Transaction()
  async run(acceptInvitationDto: AcceptInvitationDto) {
    const invitation = await this.invitationRepository.findOneById(
      acceptInvitationDto.id,
    )

    const query = plainToClass(UsersRepositoryQueryDto, {
      filter: {email: invitation.email},
    })

    const user = (await this.listUsersService.run(query))?.data[0]

    this.invitationRepository.deleteById(invitation.id)

    await this.updateUserPasswordService.run(
      plainToClass(UpdateUserPasswordDto, {
        id: user.id,
        password: acceptInvitationDto.password,
        passwordConfirmation: acceptInvitationDto.passwordConfirmation,
      }),
    )

    return Promise.resolve()
  }
}
