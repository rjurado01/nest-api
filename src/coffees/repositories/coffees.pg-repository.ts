import {Injectable} from '@nestjs/common'
import {PaginationQueryDto} from 'src/common/dtos/pagination-query.dto'
import {QueryDto} from 'src/common/dtos/query.dto'
import {DataSource, EntityNotFoundError, Repository} from 'typeorm'
import {CoffeeRepository} from './coffees.repository'
import {Coffee} from '../entities/coffee.entity'

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
