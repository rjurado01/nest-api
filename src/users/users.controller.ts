import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common'
import {InjectMapper} from '@automapper/nestjs'
import {Mapper} from '@automapper/core'

import {AdminGuard} from '../common/guards/admin.guard'
import {ListActionRepresentation} from '../common/representations/list-action.reprsentation'

import {User} from './entities/user.entity'
import {ListUsersService} from './services/list-users.service'
import {ShowUserService} from './services/show-user.service'
import {UsersRepositoryQueryDto} from './dtos/users.repository-query.dto'
import {UserListRepresentation} from './representations/user.list.representation'
import {UserShowRepresentation} from './representations/user.show.representation'

@Controller('users')
export class UsersController {
  constructor(
    private readonly listUsersService: ListUsersService,
    private readonly showUserService: ShowUserService,
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

  @Get(':id')
  @UseGuards(AdminGuard)
  async show(@Param('id') id: string) {
    const user = await this.showUserService.run(id)

    return this.mapper.map(user, User, UserShowRepresentation)
  }
}
