import {validate as cvValidate} from 'class-validator'
import {ClassConstructor, plainToClass} from 'class-transformer'

import {EntityErrors} from './entity-errors'
import {EntityInvalidError} from './errors/entity-invalid.error'

export async function dtoToEntity<T extends object, V>(
  klass: ClassConstructor<T>,
  dto: V,
): Promise<T> {
  const entity = plainToClass(klass, dto)

  validate(entity)

  return entity
}

export async function validate<T extends object>(entity: T): Promise<void> {
  const errors = new EntityErrors()
  const entityErrors = await cvValidate(entity)

  if (entityErrors.length) {
    entityErrors.forEach(validationError => {
      Object.keys(validationError.constraints).forEach(constraint => {
        errors.addError(validationError.property, constraint)
      })
    })

    throw new EntityInvalidError(errors)
  }
}
