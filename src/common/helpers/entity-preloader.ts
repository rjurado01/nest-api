import {EntityDto} from '../dtos/entity.dto'

export interface Repository<E> {
  findById(id: string): Promise<E>
}

export class EntityPreloader {
  static async preload<T>(repository: Repository<T>, dto: EntityDto) {
    const entity = await repository.findById(dto.id)

    Object.assign(entity, dto)

    return entity
  }
}
