import {Injectable} from '@nestjs/common'

import {Service} from '../../common/interfaces/service'

import {UserDto} from '../dtos/user.dto'
import {CreateUserService} from './create-user.service'
import {USER_STATUSES} from '../users.constants'

@Injectable()
export class InviteUserService implements Service {
  constructor(private readonly createUserService: CreateUserService) {}

  async run(userDto: UserDto) {
    return this.createUserService.run({
      status: USER_STATUSES.Pending,
      ...userDto,
    })
  }
}
