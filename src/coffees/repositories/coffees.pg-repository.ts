import {Injectable} from '@nestjs/common'
import {DataSource, EntityNotFoundError, Repository} from 'typeorm'

import {CoffeeRepository} from './coffees.repository'
import {Coffee} from '../entities/coffee.entity'
import {ListCoffeesQueryDto} from '../dtos/list-coffees-query.dto'
import {RepositoryQueryPaginationDto} from '../../common/dtos/repository-query-pagination.dto'

// https://stackoverflow.com/questions/29336496/extends-and-implements-in-one-class-in-typescript
@Injectable()
export class CoffeePgRepository implements CoffeeRepository<Coffee> {
  repository: Repository<Coffee>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Coffee)
  }

  async findById(id: string) {
    const coffee = await this.repository.findOne({where: {id}})

    if (!coffee) throw new EntityNotFoundError(Coffee, id)

    return coffee
  }

  findAll(query: ListCoffeesQueryDto) {
    const page: RepositoryQueryPaginationDto = query.page
    const queryFormated = {}

    // TODO: sacar a un helper
    if (page) {
      Object.assign(queryFormated, {
        skip: (page.number - 1) * page.size,
        take: page.size,
      })
    }

    return this.repository.find(queryFormated)
  }

  async create(coffee: Coffee) {
    return this.repository.insert(coffee).then(() => {})
  }

  async update(coffee: Coffee) {
    return this.repository.save(coffee).then(() => {})
  }

  async remove(coffee: Coffee) {
    return this.repository.remove(coffee).then(() => {})
  }
}
