import {QueryDto} from 'src/common/dtos/query.dto'
import {CoffeeRepository} from './coffees.repository'
import {Coffee} from '../entities/coffee.entity'

export class CoffeeMemRepository implements CoffeeRepository<Coffee> {
  collection: Coffee[] = [
    {id: '1', title: 'A1', brand: 'A1', recommendations: 0, flavors: []},
  ]

  async findById(id: string) {
    return Promise.resolve(this.collection.find(item => item.id === id))
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

    return Promise.resolve(null)
  }

  update(coffee: Coffee) {
    const index = this.collection.findIndex(item => item.id === coffee.id)

    if (index > -1) this.collection[index] = coffee

    return Promise.resolve(null)
  }
}
