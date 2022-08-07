import {Module} from '@nestjs/common'
import {UsersModule} from 'src/users/users.module'

import {InvitationsController} from './invitations.controller'
import {InvitationRepository} from './repositories/invitation.repository'
import {InvitationPgRepository} from './repositories/invitation.pg.repository'
import {CreateMassiveInvitationsService} from './services/create-massive-invitations.service'
import {CreateInvitationService} from './services/create-invitation.service'

@Module({
  providers: [
    CreateMassiveInvitationsService,
    CreateInvitationService,
    {provide: InvitationRepository, useClass: InvitationPgRepository},
  ],
  controllers: [InvitationsController],
  imports: [UsersModule],
})
export class InvitationsModule {}
