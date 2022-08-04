import {Injectable} from '@nestjs/common'
import {Inject} from '@nestjs/common'

import {Service} from '../../common/interfaces/service'
import {ListServiceOutputDto} from '../../common/dtos/list-service-output.dto'

import {User} from '../entities/user.entity'
import {UserRepository} from '../repositories/users.repository'
import {ListUsersQueryDto} from '../dtos/users-repository-query.dto'

@Injectable()
export class ListUsersService implements Service {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async run(query: ListUsersQueryDto) {
    const users = await this.userRepository.findAll(query)
    const count = await this.userRepository.count(query.filter)

    return new ListServiceOutputDto<User>(users, count)
  }
}
