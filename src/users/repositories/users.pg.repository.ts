import {Injectable} from '@nestjs/common'
import {DataSource, ILike, Repository} from 'typeorm'

import {RepositoryQueryPaginationDto} from '../../common/dtos/repository-query-pagination.dto'

import {User} from '../entities/user.entity'
import {ListUsersFiltersDto} from '../dtos/list-users-filters.dto'
import {ListUsersOrderDto} from '../dtos/list-users-order.dto'

import {UserRepository} from './users.repository'
import {ListUsersQueryDto} from '../dtos/list-users-query.dto'

@Injectable()
export class UserPgRepository implements UserRepository {
  ormRepository: Repository<User>

  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(User)
  }

  findAll(query: ListUsersQueryDto) {
    const queryFormated = {}

    if (query.page) {
      Object.assign(queryFormated, this.processPagination(query.page))
    }

    if (query.filter) {
      Object.assign(queryFormated, {where: this.processFilters(query.filter)})
    }

    if (query.order) {
      Object.assign(queryFormated, {order: this.processOrder(query.order)})
    }

    console.log(queryFormated)

    return this.ormRepository.find(queryFormated)
  }

  count(filter: ListUsersFiltersDto) {
    return this.ormRepository.count({where: this.processFilters(filter)})
  }

  private processPagination(page: RepositoryQueryPaginationDto) {
    return {
      skip: (page.number - 1) * page.size,
      take: page.size,
    }
  }

  private processFilters(filters: ListUsersFiltersDto) {
    const result = {}

    if (!filters) return result

    if (filters.email) {
      result['email'] = ILike(`%${filters.email}%`)
    }

    return result
  }

  private processOrder(order: ListUsersOrderDto) {
    const result = {}

    if (order.createdAt) {
      result['createdAt'] = order.createdAt
    }

    return result
  }
}
