import {QueryDto} from 'src/common/dtos/query.dto'

export interface CoffeeRepository<E> {
  findById(id: string): Promise<E>
  findAll(query: QueryDto): Promise<E[]>
  create(coffee: E): Promise<void>
  update(coffee: E): Promise<void>
}

export const CoffeeRepository = Symbol('CoffeeRepository')
