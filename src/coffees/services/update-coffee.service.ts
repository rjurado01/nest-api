import {Injectable} from '@nestjs/common'
import {Inject} from '@nestjs/common'

import {Coffee} from '../entities/coffee.entity'
import {CoffeeDto} from '../dtos/coffee.dto'
import {CoffeeRepository} from '../repositories/coffees.repository'
import {Service} from '../../common/interfaces/service'
import {EntityValidator} from '../../common/helpers/entity-validator'
import {EntityPreloader} from 'src/common/helpers/entity-preloader'

@Injectable()
export class UpdateCoffeeService implements Service {
  constructor(
    @Inject(CoffeeRepository)
    private readonly coffeeRepository: CoffeeRepository<Coffee>,
  ) {}

  async run(coffeeDto: CoffeeDto): Promise<void> {
    const coffee = await EntityPreloader.preload(
      this.coffeeRepository,
      coffeeDto,
    )

    await EntityValidator.validate(coffee)

    return this.coffeeRepository.update(coffee)
  }
}
