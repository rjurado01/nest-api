import {Injectable} from '@nestjs/common'
import {DataSource, EntityNotFoundError, Repository} from 'typeorm'
import {AuthUser} from '../entities/auth-user.entity'
import {AuthUserRepository} from './auth-user.repository'

@Injectable()
export class AuthUserPgRepository implements AuthUserRepository {
  ormRepository: Repository<AuthUser>

  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(AuthUser)
  }

  async findByEmail(email: string) {
    const user = await this.ormRepository.findOne({where: {email}})

    if (!user) throw new EntityNotFoundError(AuthUser, email)

    return user
  }
}
