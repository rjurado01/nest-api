import {Injectable} from '@nestjs/common'
import {Inject} from '@nestjs/common'

import {User} from '../entities/user.entity'
import {Service} from '../../common/service'
import {UserRepository} from '../repositories/users.repository'
import {QueryDto} from '../../common/dtos/query.dto'
import {ListServiceOutputDto} from '../../common/dtos/list-service-output.dto'

@Injectable()
export class ListUsersService implements Service {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async run(query: QueryDto) {
    const users = await this.userRepository.findAll(query)
    const count = await this.userRepository.count(query.filter)

    return new ListServiceOutputDto<User>(users, count)
  }
}
