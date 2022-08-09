import {Injectable, Scope} from '@nestjs/common'
import {DataSource, EntityTarget, ObjectLiteral, Repository} from 'typeorm'
import {EntityManager as TypeOrmEntityManager} from 'typeorm'

// Añade soperte para ejecutar transacciones de varios servicios
@Injectable({scope: Scope.REQUEST})
export class EntityManager extends TypeOrmEntityManager {
  transactionalEntityManager: any

  constructor(connection: DataSource) {
    super(connection)
  }

  getRepository<Entity extends ObjectLiteral>(
    target: EntityTarget<Entity>,
  ): Repository<Entity> {
    return (
      this.transactionalEntityManager?.getRepository(target) ||
      super.getRepository(target)
    )
  }

  async runInTransaction(callback: () => Promise<any>): Promise<any> {
    const result = await this.transaction(async transactionalEntityManager => {
      this.transactionalEntityManager = transactionalEntityManager
      return callback()
    })

    this.transactionalEntityManager = null

    return result
  }
}
