import {Injectable} from '@nestjs/common'
import {PaginationQueryDto} from 'src/common/dtos/pagination-query.dto'
import {QueryDto} from 'src/common/dtos/query.dto'
import {DataSource, Repository} from 'typeorm'
import {User} from '../entities/user.entity'
import {UserRepository} from './users.repository'
import {ILike} from 'typeorm'
import {ListUsersFiltersDto} from '../dtos/list-users-filters.dto'

@Injectable()
export class UserPgRepository implements UserRepository {
  ormRepository: Repository<User>

  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(User)
  }

  findAll(query: QueryDto<ListUsersFiltersDto>) {
    const queryFormated = {}

    if (query.page) {
      Object.assign(queryFormated, {where: this.processPagination(query.page)})
    }

    if (query.filter) {
      Object.assign(queryFormated, {where: this.processFilters(query.filter)})
    }

    return this.ormRepository.find(queryFormated)
  }

  count(filter: ListUsersFiltersDto) {
    return this.ormRepository.count({where: filter})
  }

  private processPagination(page: PaginationQueryDto) {
    return {
      skip: (page.number - 1) * page.size,
      take: page.size,
    }
  }

  private processFilters(filters: ListUsersFiltersDto) {
    const result = {}

    if (filters.email) {
      result['email'] = ILike(`%${filters.email}%`)
    }

    return result
  }
}
