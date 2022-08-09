import {Module} from '@nestjs/common'
import {APP_GUARD} from '@nestjs/core'
import {JwtModule} from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm'
import * as Joi from 'joi'

import {AuthService} from './auth.service'
import {JwtAuthGuard} from './guards/jwt-auth.guard'
import {LocalStrategy} from './strategies/local.strategy'
import {JwtStrategy} from './strategies/jwt.strategy'
import {AuthUserPgRepository} from './repositories/auth-user.pg.repository'
import {AuthUserRepository} from './repositories/auth-user.repository'
import {AuthUser} from './entities/auth-user.entity'
import {UpdateUserPasswordService} from './services/update-user-password.service'

@Module({
  imports: [
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
    TypeOrmModule.forFeature([AuthUser]),
  ],
  providers: [
    AuthService,
    UpdateUserPasswordService,
    LocalStrategy,
    JwtStrategy,
    {provide: APP_GUARD, useClass: JwtAuthGuard},
    {provide: AuthUserRepository, useClass: AuthUserPgRepository},
  ],
  exports: [AuthService, UpdateUserPasswordService],
})
export class AuthModule {}
