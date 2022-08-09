import {Injectable} from '@nestjs/common'
import {EntityNotFoundError, In} from 'typeorm'

import {EntityManager} from '../../common/helpers/entity-manager'

import {Invitation} from '../entities/invitation.entity'
import {InvitationRepository} from './invitation.repository'

@Injectable()
export class InvitationPgRepository implements InvitationRepository {
  entityManager: EntityManager

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager
  }

  findAllByEmails(emails: string[]) {
    return this.ormRepository.find({where: {email: In(emails)}})
  }

  async findOneById(id = '') {
    const result = await this.ormRepository.findOneBy({id})

    if (!result) throw new EntityNotFoundError(Invitation, id)

    return result
  }

  async create(invitation: Invitation) {
    return this.ormRepository.insert(invitation).then(() => {})
  }

  async deleteById(id: string) {
    return this.ormRepository.delete(id).then(() => {})
  }

  private get ormRepository() {
    return this.entityManager.getRepository(Invitation)
  }
}
