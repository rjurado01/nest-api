import {Entity} from '../interfaces/entity'

export interface Repository<E> {
  findById(id: string): Promise<E>
}

export class EntityPreloader {
  static async preload<T>(repository: Repository<T>, dto: Entity) {
    const entity = await repository.findById(dto.id)

    Object.assign({...entity}, dto)

    return entity
  }
}
