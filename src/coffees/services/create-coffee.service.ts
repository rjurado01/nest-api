import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Coffee} from '../entities/coffee.entity'
import {Repository} from 'typeorm'
import {CreateCoffeeDto} from '../dto/create-coffee.dto'

@Injectable()
export class CreateCoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  run(createCoffeeDto: CreateCoffeeDto) {
    console.log('Dbug 1')
    const coffee = this.coffeeRepository.create(createCoffeeDto)
    console.log(coffee)

    return this.coffeeRepository.save(coffee)
  }
}
