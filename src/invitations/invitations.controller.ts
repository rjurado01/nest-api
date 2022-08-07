import {Body, Controller, HttpCode, Post, UseGuards} from '@nestjs/common'

import {AdminGuard} from '../common/guards/admin.guard'
import {CreateMassiveInvitationsService} from './services/create-massive-invitations.service'
import {CreateMassiveInvitationsEntryDto} from './dtos/create-massive-invitations-entry.dto'

@Controller('invitations')
export class InvitationsController {
  constructor(
    private readonly createMassiveInvitationsService: CreateMassiveInvitationsService,
  ) {}

  @Post('massive')
  @HttpCode(204)
  @UseGuards(AdminGuard)
  create(@Body() inviteUsersDto: CreateMassiveInvitationsEntryDto) {
    return this.createMassiveInvitationsService.run(inviteUsersDto)
  }
}
