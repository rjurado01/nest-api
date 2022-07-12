import {QueryDto} from 'src/common/dto/query.dto'

export interface CoffeeRepository<E> {
  findById(id: string): Promise<E>
  findAll(query: QueryDto): Promise<E[]>
  create(coffee: E): Promise<E>
}

export const CoffeeRepository = Symbol('CoffeeRepository')
