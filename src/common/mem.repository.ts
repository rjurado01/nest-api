import {EntityNotFoundError} from 'typeorm'

import {QueryDto} from './dtos/query.dto'
import {Entity} from './entity'

export class MemRepository<T extends Entity, FilterDto> {
  collection: T[] = []

  async findById(id: string) {
    const user = this.collection.find(item => item.id === id)

    if (!user) throw new EntityNotFoundError(null, {id: id})

    return Promise.resolve(user)
  }

  findAll(query: QueryDto<FilterDto>) {
    const page = query.page?.number
    const size = query.page?.size

    return Promise.resolve(
      page ? this.collection.slice((page - 1) * size, size) : this.collection,
    )
  }

  create(user: T) {
    this.collection.push(user)

    return Promise.resolve()
  }

  update(user: T) {
    const index = this.collection.findIndex(item => item.id === user.id)

    if (index > -1) this.collection[index] = user

    return Promise.resolve()
  }

  remove(user: T) {
    const index = this.collection.findIndex(item => item.id === user.id)

    if (index > -1) this.collection.splice(index, 1)

    return Promise.resolve()
  }
}
