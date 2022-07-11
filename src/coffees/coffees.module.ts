import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {CoffeesController} from './coffees.controller'
import {Coffee} from './entities/coffee.entity'
import {CoffeesService} from './coffees.service'
import {CoffeeFlavor} from './entities/coffee-flavor.entity'
import {COFFEE_BRANDS} from './coffees.constants'
import {Connection} from 'typeorm'
import {CreateCoffeeService} from './services/create-coffee.service'

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, CoffeeFlavor])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CreateCoffeeService,
    {
      provide: COFFEE_BRANDS,
      useFactory: async (_connection: Connection): Promise<string[]> => {
        // const coffeeBrands = await connection.query('SELECT * ...')
        const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe'])
        return coffeeBrands
      },
      inject: [Connection],
    },
  ],
  // providers: [{provide: CoffeesService, useValue: new MockCoffeesService()}],
  exports: [CoffeesService],
})
export class CoffeesModule {}
