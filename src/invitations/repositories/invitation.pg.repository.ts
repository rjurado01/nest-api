import {Injectable} from '@nestjs/common'
import {In, Repository} from 'typeorm'

import {EntityManager} from '../../common/helpers/entity-manager'

import {Invitation} from '../entities/invitation.entity'
import {InvitationRepository} from './invitation.repository'

@Injectable()
export class InvitationPgRepository implements InvitationRepository {
  ormRepository: Repository<Invitation>

  constructor(entityManager: EntityManager) {
    this.ormRepository = entityManager.getRepository(Invitation)
  }

  findByEmails(emails: string[]) {
    return this.ormRepository.find({where: {email: In(emails)}})
  }

  async create(invitation: Invitation) {
    return this.ormRepository.insert(invitation).then(() => {})
  }
}
