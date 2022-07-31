import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {CoffeesModule} from './coffees/coffees.module'
import {Event} from './events/entities/event.entity'
import {CoffeeRatingModule} from './coffee-rating/coffee-rating.module'
import {ConfigModule} from '@nestjs/config'
import {CommonModule} from './common/common.module'
import {AuthModule} from './auth/auth.module'
import {UsersModule} from './users/users.module'
import * as Joi from 'joi'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        // POSTGRES_HOST: Joi.required(),
        // POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_USER: Joi.required(),
      }),
    }),
    CommonModule,
    CoffeesModule,
    CoffeeRatingModule,
    Event,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: +process.env.POSTGRES_PORT || 5432,
      username: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB || 'nest_api_dev',
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
