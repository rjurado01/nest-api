import {Injectable} from '@nestjs/common'
import {Inject} from '@nestjs/common'

import {Coffee} from '../entities/coffee.entity'
import {CoffeeRepository} from '../repositories/coffees.repository'
import {Service} from '../../common/interfaces/service'

@Injectable()
export class ShowCoffeeService implements Service {
  constructor(
    @Inject(CoffeeRepository)
    private readonly coffeeRepository: CoffeeRepository<Coffee>,
  ) {}

  run(id: string) {
    return this.coffeeRepository.findById(id)
  }
}
