import {Injectable} from '@nestjs/common'
import {Inject} from '@nestjs/common'

import {Coffee} from '../entities/coffee.entity'
import {PaginationQueryDto} from '../../common/dtos/pagination-query.dto'
import {QueryDto} from '../../common/dtos/query.dto'
import {CoffeeRepository} from '../repositories/coffees.repository'
import {Service} from '../../common/service'

@Injectable()
export class ListCoffeesService implements Service {
  constructor(
    @Inject(CoffeeRepository)
    private readonly coffeeRepository: CoffeeRepository<Coffee>,
  ) {}

  run(query: QueryDto) {
    query.page ||= new PaginationQueryDto()

    return this.coffeeRepository.findAll(query)
  }
}
