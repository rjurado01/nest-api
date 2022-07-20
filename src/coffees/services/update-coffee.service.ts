import {Injectable} from '@nestjs/common'
import {Inject} from '@nestjs/common'

import {Coffee} from '../entities/coffee.entity'
import {UpdateCoffeeDto} from '../dtos/update-coffee.dto'
import {CoffeeRepository} from '../repositories/coffees.repository'
import {Service} from '../../common/service'
import {EntityInvalidError} from 'src/common/errors/entity-invalid.error'
import {validate} from '../../common/entity-utils'

@Injectable()
export class UpdateCoffeeService implements Service {
  constructor(
    @Inject(CoffeeRepository)
    private readonly coffeeRepository: CoffeeRepository<Coffee>,
  ) {}

  async run(updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.findById(updateCoffeeDto.id)

    Object.assign(coffee, updateCoffeeDto)

    validate(coffee)

    this.coffeeRepository.update(coffee)
  }
}
