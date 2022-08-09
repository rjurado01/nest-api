import {AuthUser} from '../entities/auth-user.entity'

export interface AuthUserRepository {
  // TODO: cambiar por findOne...
  findById: (id: string) => Promise<AuthUser>
  findByEmail: (email: string) => Promise<AuthUser>
  update: (user: AuthUser) => Promise<void>
}

export const AuthUserRepository = Symbol('AuthUserRepository')
