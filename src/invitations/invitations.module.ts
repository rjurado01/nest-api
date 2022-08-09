import {Module} from '@nestjs/common'
import {UsersModule} from 'src/users/users.module'

import {InvitationsController} from './invitations.controller'
import {InvitationRepository} from './repositories/invitation.repository'
import {InvitationPgRepository} from './repositories/invitation.pg.repository'
import {CreateMassiveInvitationsService} from './services/create-massive-invitations.service'
import {CreateInvitationService} from './services/create-invitation.service'
import {AuthModule} from 'src/auth/auth.module'
import {AcceptInvitationService} from './services/accept-invitation.service'

@Module({
  providers: [
    CreateMassiveInvitationsService,
    CreateInvitationService,
    AcceptInvitationService,
    {provide: InvitationRepository, useClass: InvitationPgRepository},
  ],
  controllers: [InvitationsController],
  imports: [UsersModule, AuthModule],
})
export class InvitationsModule {}
