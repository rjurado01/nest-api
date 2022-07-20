import {Injectable} from '@nestjs/common'
import {Inject} from '@nestjs/common'

import {Coffee} from '../entities/coffee.entity'
import {CreateCoffeeDto} from '../dtos/create-coffee.dto'
import {CoffeeRepository} from '../repositories/coffees.repository'
import {Service} from '../../common/service'
import {EntityInvalidError} from '../../common/errors/entity-invalid.error'
import {EntityErrors} from 'src/common/entity-errors'
import {dtoToEntity} from 'src/common/dto-to-entity-mapper'

@Injectable()
export class CreateCoffeeService implements Service {
  constructor(
    @Inject(CoffeeRepository)
    private readonly coffeeRepository: CoffeeRepository<Coffee>,
  ) {}

  async run(createCoffeeDto: CreateCoffeeDto) {
    let errors: EntityErrors = new EntityErrors()
    let coffee: Coffee = null

    try {
      coffee = await dtoToEntity(Coffee, createCoffeeDto)
    } catch (err) {
      errors = err.errors
    }

    try {
      await this.coffeeRepository.findById(createCoffeeDto.id)
      errors.addError('id', 'taken')
    } catch (err) {}

    if (errors.hasErrors()) throw new EntityInvalidError(errors)

    await this.coffeeRepository.create(coffee)
  }
}
