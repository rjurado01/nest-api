import {Injectable} from '@nestjs/common'
import {Inject} from '@nestjs/common'

import {Coffee} from '../entities/coffee.entity'
import {CoffeeRepository} from '../repositories/coffees.repository'
import {Service} from '../../common/interfaces/service'

@Injectable()
export class RemoveCoffeeService implements Service {
  constructor(
    @Inject(CoffeeRepository)
    private readonly coffeeRepository: CoffeeRepository<Coffee>,
  ) {}

  async run(id: string): Promise<void> {
    const coffee = await this.coffeeRepository.findById(id)

    return this.coffeeRepository.remove(coffee)
  }
}
