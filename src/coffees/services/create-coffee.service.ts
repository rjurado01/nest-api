import {Injectable} from '@nestjs/common'
import {Inject} from '@nestjs/common'

import {Coffee} from '../entities/coffee.entity'
import {CoffeeDto} from '../dtos/coffee.dto'
import {CoffeeRepository} from '../repositories/coffees.repository'
import {Service} from '../../common/service'
import {EntityInvalidError} from '../../common/errors/entity-invalid.error'
import {EntityErrors} from '../../common/helpers/entity-errors'
import {EntityMapper} from '../../common/helpers/entity-mapper'

@Injectable()
export class CreateCoffeeService implements Service {
  constructor(
    @Inject(CoffeeRepository)
    private readonly coffeeRepository: CoffeeRepository<Coffee>,
  ) {}

  async run(createCoffeeDto: CoffeeDto) {
    let errors: EntityErrors = new EntityErrors()
    let coffee: Coffee = null

    try {
      coffee = await EntityMapper.dtoToEntity(Coffee, createCoffeeDto)
    } catch (err) {
      errors = err.errors
    }

    console.log(coffee)

    try {
      await this.coffeeRepository.findById(createCoffeeDto.id)
      errors.addError('id', 'taken', {value: createCoffeeDto.id})
    } catch (err) {}

    if (errors.hasErrors()) throw new EntityInvalidError(errors)

    await this.coffeeRepository.create(coffee)
  }
}
