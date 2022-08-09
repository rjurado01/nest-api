import {EntityTarget} from 'typeorm'
import {Injectable} from '@nestjs/common'
import {EntityManager} from '../helpers/entity-manager'

@Injectable()
export class PgRepository<E> {
  entityManager: EntityManager
  entity: EntityTarget<E>

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager
  }

  protected get ormRepository() {
    return this.entityManager.getRepository(this.entity)
  }
}
