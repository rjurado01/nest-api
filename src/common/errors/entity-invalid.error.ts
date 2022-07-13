import {EntityErrors} from '../helpers/entity-errors'

export class EntityInvalidError extends Error {
  constructor(readonly errors: EntityErrors) {
    super('Invalid entity')
  }
}
