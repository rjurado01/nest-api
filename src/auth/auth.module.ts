import {Module} from '@nestjs/common'
import {APP_GUARD} from '@nestjs/core'
import {JwtModule} from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'
import {ConfigModule, ConfigService} from '@nestjs/config'

import {AuthService} from './auth.service'
import {JwtAuthGuard} from './guards/jwt-auth.guard'
import {LocalStrategy} from './strategies/local.strategy'
import {JwtStrategy} from './strategies/jwt.strategy'
import {UsersModule} from '../users/users.module'
import * as Joi from 'joi'

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
  ],
  exports: [AuthService],
})
export class AuthModule {}
