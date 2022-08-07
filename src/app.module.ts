import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {ConfigModule} from '@nestjs/config'
import {AutomapperModule} from '@automapper/nestjs'
import {classes} from '@automapper/classes'

import {AppController} from './app.controller'
import {AppService} from './app.service'
import {CoffeesModule} from './coffees/coffees.module'
import {Event} from './events/entities/event.entity'
import {CoffeeRatingModule} from './coffee-rating/coffee-rating.module'
import {CommonModule} from './common/common.module'
import {AuthModule} from './auth/auth.module'
import {UsersModule} from './users/users.module'
import {InvitationsModule} from './invitations/invitations.module'

import * as Joi from 'joi'
import {AppDataSource} from 'ormconfig'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        // POSTGRES_HOST: Joi.required(),
        // POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_USER: Joi.required(),
      }),
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    CommonModule,
    CoffeesModule,
    CoffeeRatingModule,
    Event,
    TypeOrmModule.forRoot(AppDataSource.options),
    AuthModule,
    UsersModule,
    InvitationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
