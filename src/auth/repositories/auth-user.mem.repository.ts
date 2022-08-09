import {EntityNotFoundError} from 'typeorm'
import {Injectable} from '@nestjs/common'

import {AuthUserRepository} from './auth-user.repository'
import {AuthUser} from '../entities/auth-user.entity'

// sample user
const user = new AuthUser()
Object.assign(user, {
  id: 'a1',
  email: 'user1@email.com',
  passwordDigest: 'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=', // 123456
})

@Injectable()
export class AuthUserMemRepository implements AuthUserRepository {
  collection: AuthUser[] = [user]

  async findByEmail(email: string) {
    const user = this.collection.find(item => item.email === email)

    if (!user) throw new EntityNotFoundError(AuthUser, {email})

    return Promise.resolve(user)
  }

  async findById(id: string) {
    const user = this.collection.find(item => item.id === id)

    if (!user) throw new EntityNotFoundError(AuthUser, {id})

    return Promise.resolve(user)
  }

  update: (user: AuthUser) => Promise<void>
}
