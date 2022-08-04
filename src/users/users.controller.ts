import {Controller, Get, Query, UseGuards} from '@nestjs/common'
import {InjectMapper} from '@automapper/nestjs'
import {Mapper} from '@automapper/core'

import {AdminGuard} from '../common/guards/admin.guard'
import {ListActionOutputDto} from '../common/dtos/list-action-output.dto'

import {ListUsersService} from './services/list-users.service'
import {User} from './entities/user.entity'
import {ListActionUserDto} from './dtos/list-action-user.dto'
import {ListUsersQueryDto} from './dtos/list-users-query.dto'

@Controller('users')
export class UsersController {
  constructor(
    private readonly listUsersService: ListUsersService,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  @Get()
  @UseGuards(AdminGuard)
  async index(@Query() queryDto: ListUsersQueryDto) {
    console.log(queryDto)
    const result = await this.listUsersService.run(queryDto)

    const data: ListActionUserDto[] = await this.mapper.mapArrayAsync(
      result.data,
      User,
      ListActionUserDto,
    )

    return new ListActionOutputDto<ListActionUserDto>(data, result.meta)
  }
}
