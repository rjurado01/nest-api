import {Injectable} from '@nestjs/common'
import {Inject} from '@nestjs/common'

import {Coffee} from '../entities/coffee.entity'
import {QueryDto} from '../../common/dtos/query.dto'
import {CoffeeRepository} from '../repositories/coffees.repository'
import {Service} from '../../common/service'
import {ListCoffeesFiltersDto} from '../dtos/list-coffees-filters.dto'

@Injectable()
export class ListCoffeesService implements Service {
  constructor(
    @Inject(CoffeeRepository)
    private readonly coffeeRepository: CoffeeRepository<Coffee>,
  ) {}

  run(query: QueryDto<ListCoffeesFiltersDto>) {
    return this.coffeeRepository.findAll(query)

    // TODO: DTO ??
  }
}
