import {Injectable} from '@nestjs/common'
import {DataSource, In, Repository} from 'typeorm'

import {Invitation} from '../entities/invitation.entity'
import {InvitationRepository} from './invitation.repository'

@Injectable()
export class InvitationPgRepository implements InvitationRepository {
  ormRepository: Repository<Invitation>

  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(Invitation)
  }

  findByEmails(emails: string[]) {
    return this.ormRepository.find({where: {email: In(emails)}})
  }

  async create(invitation: Invitation) {
    return this.ormRepository.insert(invitation).then(() => {})
  }
}
