import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {CoffeesController} from './coffees.controller'
import {Coffee} from './entities/coffee.entity'
import {CoffeeFlavor} from './entities/coffee-flavor.entity'
import {COFFEE_BRANDS} from './coffees.constants'
import {Connection} from 'typeorm'
import {CreateCoffeeService} from './services/create-coffee.service'
import {ListCoffeesService} from './services/list-coffees.service'
import {CoffeeRepository} from './repositories/coffees.repository'
import {CoffeeMemRepository} from './repositories/coffees.mem-repository'
import {CoffeePgRepository} from './repositories/coffees.pg-repository'
import {UpdateCoffeeService} from './services/update-coffee.service'
import {ShowCoffeeService} from './services/show-coffee.service'
import {RemoveCoffeeService} from './services/remove-coffee.service'

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, CoffeeFlavor])],
  controllers: [CoffeesController],
  providers: [
    CreateCoffeeService,
    ListCoffeesService,
    ShowCoffeeService,
    UpdateCoffeeService,
    RemoveCoffeeService,
    {
      provide: CoffeeRepository,
      useClass: CoffeeMemRepository,
      //useClass: CoffeePgRepository,
    },
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
  exports: [
    CreateCoffeeService,
    ListCoffeesService,
    ShowCoffeeService,
    UpdateCoffeeService,
    RemoveCoffeeService,
  ],
})
export class CoffeesModule {}
