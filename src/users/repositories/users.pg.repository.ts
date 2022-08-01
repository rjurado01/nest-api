import {Injectable} from '@nestjs/common'
import {PaginationQueryDto} from 'src/common/dtos/pagination-query.dto'
import {QueryDto} from 'src/common/dtos/query.dto'
import {DataSource, Repository} from 'typeorm'
import {User} from '../entities/user.entity'
import {UserRepository} from './users.repository'

@Injectable()
export class UserPgRepository implements UserRepository {
  ormRepository: Repository<User>

  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(User)
  }

  findAll(query: QueryDto) {
    const page: PaginationQueryDto = query.page
    const queryFormated = {}

    // TODO: sacar a un helper
    if (page) {
      Object.assign(queryFormated, {
        skip: (page.number - 1) * page.size,
        take: page.size,
      })
    }

    return this.ormRepository.find(queryFormated)
  }

  count(filter: object) {
    return this.ormRepository.count({where: filter})
  }
}
