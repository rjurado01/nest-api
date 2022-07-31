import {AuthUser} from '../entities/auth-user.entity'

export interface AuthUserRepository {
  findByEmail: (email: string) => Promise<AuthUser>
}

export const AuthUserRepository = Symbol('AuthUserRepository')
