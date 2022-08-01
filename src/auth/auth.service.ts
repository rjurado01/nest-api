import {Inject, Injectable} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import {AuthUser} from './entities/auth-user.entity'

import {AuthUserRepository} from './repositories/auth-user.repository'

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthUserRepository)
    private authUserRepository: AuthUserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.authUserRepository.findByEmail(email)

    if (!user || !user.validate(pass)) return null

    const {passwordDigest, ...result} = user

    return result
  }

  async login(user: AuthUser) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
