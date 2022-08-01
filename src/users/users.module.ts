import {Module} from '@nestjs/common'
import {UserProfile} from './dtos/user.profile'

import {UserPgRepository} from './repositories/users.pg.repository'
import {UserRepository} from './repositories/users.repository'
import {ListUsersService} from './services/list-users.service'
import {UsersController} from './users.controller'

@Module({
  providers: [
    ListUsersService,
    UserProfile,
    {provide: UserRepository, useClass: UserPgRepository},
  ],
  controllers: [UsersController],
  exports: [ListUsersService],
})
export class UsersModule {}
