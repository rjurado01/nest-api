import {QueryDto} from 'src/common/dtos/query.dto'
import {CoffeeRepository} from './coffees.repository'
import {Coffee} from '../entities/coffee.entity'
import {EntityNotFoundError} from 'typeorm'

export class CoffeeMemRepository implements CoffeeRepository<Coffee> {
  collection: Coffee[] = []

  async findById(id: string) {
    const coffee = this.collection.find(item => item.id === id)

    if (!coffee) throw new EntityNotFoundError(Coffee, {id: id})

    return Promise.resolve(coffee)
  }

  findAll(query: QueryDto) {
    const page = query.page?.number
    const size = query.page?.size

    return Promise.resolve(
      page ? this.collection.slice((page - 1) * size, size) : this.collection,
    )
  }

  create(coffee: Coffee) {
    this.collection.push(coffee)

    return Promise.resolve()
  }

  update(coffee: Coffee) {
    const index = this.collection.findIndex(item => item.id === coffee.id)

    if (index > -1) this.collection[index] = coffee

    return Promise.resolve()
  }

  remove(coffee: Coffee) {
    const index = this.collection.findIndex(item => item.id === coffee.id)

    if (index > -1) this.collection.splice(index, 1)

    return Promise.resolve()
  }
}
