import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {CoffeesController} from './coffees.controller'
import {Coffee} from './entities/coffee.entity'
import {CoffeesService} from './coffees.service'
import {CoffeeFlavor} from './entities/coffee-flavor.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, CoffeeFlavor])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
  // providers: [{provide: CoffeesService, useValue: new MockCoffeesService()}],
  exports: [CoffeesService],
})
export class CoffeesModule {}
