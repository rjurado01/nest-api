import {Controller, Get, Query, UseGuards} from '@nestjs/common'
import {InjectMapper} from '@automapper/nestjs'
import {Mapper} from '@automapper/core'

import {AdminGuard} from '../common/guards/admin.guard'
import {ListActionRepresentation} from '../common/representations/list-action.reprsentation'

import {ListUsersService} from './services/list-users.service'
import {User} from './entities/user.entity'
import {UserListRepresentation} from './representations/user.list.representation'
import {UsersRepositoryQueryDto} from './dtos/users.repository-query.dto'

@Controller('users')
export class UsersController {
  constructor(
    private readonly listUsersService: ListUsersService,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  @Get()
  @UseGuards(AdminGuard)
  async index(@Query() queryDto: UsersRepositoryQueryDto) {
    const result = await this.listUsersService.run(queryDto)

    const data: UserListRepresentation[] = await this.mapper.mapArrayAsync(
      result.data,
      User,
      UserListRepresentation,
    )

    return new ListActionRepresentation<UserListRepresentation>(
      data,
      result.meta,
    )
  }
}
