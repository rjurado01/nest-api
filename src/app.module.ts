import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {CoffeesModule} from './coffees/coffees.module'
import {Event} from './events/entities/event.entity'
import {CoffeeRatingModule} from './coffee-rating/coffee-rating.module'

@Module({
  imports: [
    CoffeesModule,
    CoffeeRatingModule,
    Event,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'rjurado',
      database: 'nest_api_dev',
      autoLoadEntities: true,
      // synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
