import {Module} from '@nestjs/common'

import {UsersController} from './users.controller'
import {UsersProfile} from './users.profile'
import {ListUsersService} from './services/list-users.service'
import {ShowUserService} from './services/show-user.service'
import {UserPgRepository} from './repositories/users.pg.repository'
import {UserRepository} from './repositories/users.repository'
import {InviteUserService} from './services/invite-user.service'
import {UserDto} from './dtos/user.dto'
import {CreateUserService} from './services/create-user.service'

@Module({
  providers: [
    ListUsersService,
    ShowUserService,
    CreateUserService,
    InviteUserService,
    UsersProfile,
    UserDto,
    {provide: UserRepository, useClass: UserPgRepository},
  ],
  controllers: [UsersController],
  exports: [ListUsersService, InviteUserService, UserDto],
})
export class UsersModule {}
