import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import {QueryDto} from '../common/dtos/query.dto'

import {ListUsersService} from './services/list-users.service'

import {AdminGuard} from '../common/guards/admin.guard'

@Controller('users')
export class UsersController {
  constructor(private readonly listUsersService: ListUsersService) {}

  @Get()
  @UseGuards(AdminGuard)
  async index(@Query() queryDto: QueryDto) {
    return this.listUsersService.run(queryDto)
  }
}
