import {validate as cvValidate} from 'class-validator'

import {EntityErrors} from './entity-errors'
import {EntityInvalidError} from '../errors/entity-invalid.error'

export class EntityValidator {
  static async validate<T extends object>(entity: T): Promise<void> {
    const errors = new EntityErrors()
    const entityErrors = await cvValidate(entity)

    // transformamos a nuestro formato de errores
    if (entityErrors.length) {
      entityErrors.forEach(validationError => {
        Object.keys(validationError.constraints).forEach(constraint => {
          errors.addError(validationError.property, constraint)
        })
      })

      throw new EntityInvalidError(errors)
    }
  }
}
