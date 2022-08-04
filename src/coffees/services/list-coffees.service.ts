import {Injectable} from '@nestjs/common'
import {Inject} from '@nestjs/common'

import {Coffee} from '../entities/coffee.entity'
import {CoffeeRepository} from '../repositories/coffees.repository'
import {Service} from '../../common/interfaces/service'
import {ListCoffeesQueryDto} from '../dtos/list-coffees-query.dto'

@Injectable()
export class ListCoffeesService implements Service {
  constructor(
    @Inject(CoffeeRepository)
    private readonly coffeeRepository: CoffeeRepository<Coffee>,
  ) {}

  run(query: ListCoffeesQueryDto) {
    return this.coffeeRepository.findAll(query)

    // TODO: DTO ??
  }
}
