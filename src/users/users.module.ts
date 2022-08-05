import {Module} from '@nestjs/common'

import {UsersController} from './users.controller'
import {UsersProfile} from './users.profile'
import {ListUsersService} from './services/list-users.service'
import {ShowUserService} from './services/show-user.service'
import {UserPgRepository} from './repositories/users.pg.repository'
import {UserRepository} from './repositories/users.repository'

@Module({
  providers: [
    ListUsersService,
    ShowUserService,
    UsersProfile,
    {provide: UserRepository, useClass: UserPgRepository},
  ],
  controllers: [UsersController],
  exports: [ListUsersService],
})
export class UsersModule {}
