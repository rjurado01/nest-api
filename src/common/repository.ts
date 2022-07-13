import {QueryDto} from './dtos/query.dto'

export interface Repository<E> {
  findById(id: string): Promise<E>
  findAll(query: QueryDto): Promise<E[]>
  create(entity: E): Promise<void>
  update(entity: E): Promise<void>
  remove(entity: E): Promise<void>
}
