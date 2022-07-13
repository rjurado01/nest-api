import {ClassConstructor, plainToClass} from 'class-transformer'
import {EntityValidator} from './entity-validator'

export class EntityMapper {
  static async dtoToEntity<T extends object, D>(
    klass: ClassConstructor<T>,
    dto: D,
  ): Promise<T> {
    const entity = plainToClass(klass, dto)

    await EntityValidator.validate(entity)

    return entity
  }
}
