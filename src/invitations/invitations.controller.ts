import {
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'

import {AdminGuard} from '../common/guards/admin.guard'

import {CreateMassiveInvitationsService} from './services/create-massive-invitations.service'
import {AcceptInvitationService} from './services/accept-invitation.service'
import {CreateMassiveInvitationsEntryDto} from './dtos/create-massive-invitations-entry.dto'
import {AcceptInvitationDto} from './dtos/accept-invitation.dto'

@Controller('invitations')
export class InvitationsController {
  constructor(
    private readonly createMassiveInvitationsService: CreateMassiveInvitationsService,
    private readonly acceptInvitationService: AcceptInvitationService,
  ) {}

  @Post('massive')
  @HttpCode(204)
  @UseGuards(AdminGuard)
  create(@Body() inviteUsersDto: CreateMassiveInvitationsEntryDto) {
    return this.createMassiveInvitationsService.run(inviteUsersDto)
  }

  @Put(':id/accept')
  @HttpCode(204)
  @UseGuards(AdminGuard)
  update(
    @Param('id') id: string,
    @Body() acceptInvitationDto: AcceptInvitationDto,
  ) {
    return this.acceptInvitationService.run({id, ...acceptInvitationDto})
  }
}
