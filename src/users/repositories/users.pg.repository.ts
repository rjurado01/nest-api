import {Injectable} from '@nestjs/common'
import {EntityNotFoundError, ILike, In, Repository} from 'typeorm'

import {RepositoryQueryPaginationDto} from '../../common/dtos/repository-query-pagination.dto'

import {User} from '../entities/user.entity'
import {UsersRepositoryQueryFilterDto} from '../dtos/users.repository-query-filter.dto'
import {UsersRepositoryQueryOrderDto} from '../dtos/users.repository-query-order.dto'

import {UserRepository} from './users.repository'
import {UsersRepositoryQueryDto} from '../dtos/users.repository-query.dto'
import {EntityManager} from '../../common/helpers/entity-manager'

@Injectable()
export class UserPgRepository implements UserRepository {
  entityManager: EntityManager

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager
  }

  findAll(query: UsersRepositoryQueryDto) {
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

    return this.ormRepository.find(queryFormated)
  }

  async findById(id: string) {
    const user = await this.ormRepository.findOne({where: {id}})

    if (!user) throw new EntityNotFoundError(User, id)

    return user
  }

  count(filter: UsersRepositoryQueryFilterDto) {
    return this.ormRepository.count({where: this.processFilters(filter)})
  }

  async create(user: User) {
    return this.entityManager
      .getRepository(User)
      .insert(user)
      .then(() => {})
  }

  private get ormRepository() {
    return this.entityManager.getRepository(User)
  }

  private processPagination(page: RepositoryQueryPaginationDto) {
    return {
      skip: (page.number - 1) * page.size,
      take: page.size,
    }
  }

  private processFilters(filter: UsersRepositoryQueryFilterDto) {
    const result = {}

    if (!filter) return result

    if (filter.email) {
      result['email'] = ILike(`%${filter.email}%`)
    } else if (filter.emails) {
      result['email'] = In(filter.emails)
    }

    return result
  }

  private processOrder(order: UsersRepositoryQueryOrderDto) {
    const result = {}

    if (order.createdAt) {
      result['createdAt'] = order.createdAt
    }

    return result
  }
}
