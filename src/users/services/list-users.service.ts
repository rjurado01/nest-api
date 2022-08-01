import {Injectable} from '@nestjs/common'
import {Inject} from '@nestjs/common'

import {QueryDto} from '../../common/dtos/query.dto'
import {UserRepository} from '../repositories/users.repository'
import {Service} from '../../common/service'
import {ListUserDto} from '../dtos/list-user.dto'
import {InjectMapper} from '@automapper/nestjs'
import {Mapper} from '@automapper/core'
import {User} from '../entities/user.entity'

@Injectable()
export class ListUsersService implements Service {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async run(query: QueryDto): Promise<ListUserDto[]> {
    const users = await this.userRepository.findAll(query)

    return this.mapper.mapArrayAsync(users, User, ListUserDto)
  }
}
