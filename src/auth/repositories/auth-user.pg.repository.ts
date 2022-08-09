import {EntityNotFoundError} from 'typeorm'

import {PgRepository} from '../../common/repositories/pg.repository'
import {AuthUser} from '../entities/auth-user.entity'
import {AuthUserRepository} from './auth-user.repository'

export class AuthUserPgRepository
  extends PgRepository<AuthUser>
  implements AuthUserRepository
{
  entity = AuthUser

  async findById(id: string) {
    const user = await this.ormRepository.findOne({where: {id}})

    if (!user) throw new EntityNotFoundError(this.entity, id)

    return user
  }

  async findByEmail(email: string) {
    const user = await this.ormRepository.findOne({where: {email}})

    if (!user) throw new EntityNotFoundError(this.entity, email)

    return user
  }

  async update(authUser: AuthUser) {
    return this.ormRepository.save(authUser).then(() => {})
  }
}
