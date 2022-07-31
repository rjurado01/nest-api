import {Module} from '@nestjs/common'
import {APP_GUARD} from '@nestjs/core'
import {JwtModule, JwtService} from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'
import {ConfigModule, ConfigService} from '@nestjs/config'
import * as Joi from 'joi'

import {AuthService} from './auth.service'
import {JwtAuthGuard} from './guards/jwt-auth.guard'
import {LocalStrategy} from './strategies/local.strategy'
import {JwtStrategy} from './strategies/jwt.strategy'
import {UsersModule} from '../users/users.module'
import {AuthUserMemRepository} from './repositories/auth-user.mem-repository'
import {AuthUserRepository} from './repositories/auth-user.repository'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.required(),
        JWT_EXP: Joi.required(),
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXP'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {provide: APP_GUARD, useClass: JwtAuthGuard},
    {provide: AuthUserRepository, useClass: AuthUserMemRepository},
  ],
  exports: [AuthService],
})
export class AuthModule {}
