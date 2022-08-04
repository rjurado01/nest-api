import {ListCoffeesQueryDto} from '../dtos/list-coffees-query.dto'

export interface CoffeeRepository<E> {
  findById(id: string): Promise<E>
  findAll(query: ListCoffeesQueryDto): Promise<E[]>
  create(entity: E): Promise<void>
  update(entity: E): Promise<void>
  remove(entity: E): Promise<void>
}

export const CoffeeRepository = Symbol('CoffeeRepository')
