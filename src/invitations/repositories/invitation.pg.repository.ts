import {Injectable} from '@nestjs/common'
import {In} from 'typeorm'

import {EntityManager} from '../../common/helpers/entity-manager'

import {Invitation} from '../entities/invitation.entity'
import {InvitationRepository} from './invitation.repository'

@Injectable()
export class InvitationPgRepository implements InvitationRepository {
  entityManager: EntityManager

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager
  }

  findByEmails(emails: string[]) {
    return this.ormRepository.find({where: {email: In(emails)}})
  }

  async create(invitation: Invitation) {
    return this.ormRepository.insert(invitation).then(() => {})
  }

  private get ormRepository() {
    return this.entityManager.getRepository(Invitation)
  }
}
