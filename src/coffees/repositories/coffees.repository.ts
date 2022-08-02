import {QueryDto} from '../../common/dtos/query.dto'
import {ListCoffeesFiltersDto} from '../dtos/list-coffees-filters.dto'

export interface CoffeeRepository<E> {
  findById(id: string): Promise<E>
  findAll(query: QueryDto<ListCoffeesFiltersDto>): Promise<E[]>
  create(entity: E): Promise<void>
  update(entity: E): Promise<void>
  remove(entity: E): Promise<void>
}

export const CoffeeRepository = Symbol('CoffeeRepository')
