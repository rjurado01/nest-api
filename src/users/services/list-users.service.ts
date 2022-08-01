import {Injectable} from '@nestjs/common'
import {Inject} from '@nestjs/common'
import {InjectMapper} from '@automapper/nestjs'
import {Mapper} from '@automapper/core'

import {User} from '../entities/user.entity'
import {Service} from '../../common/service'
import {UserRepository} from '../repositories/users.repository'
import {QueryDto} from '../../common/dtos/query.dto'
import {ListUserDto} from '../dtos/list-user.dto'
import {ListResultDto} from '../../common/dtos/list-result.dto'

@Injectable()
export class ListUsersService implements Service {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async run(query: QueryDto) {
    const users = await this.userRepository.findAll(query)
    const count = await this.userRepository.count(query.filter)

    const data: ListUserDto[] = await this.mapper.mapArrayAsync(
      users,
      User,
      ListUserDto,
    )

    return new ListResultDto<ListUserDto>(data, count)
  }
}
