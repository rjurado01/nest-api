import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {CreateCoffeeDto} from './dto/create-coffee.dto'
import {UpdateCoffeeDto} from './dto/update-coffee.dto'
import {Coffee} from './entities/coffee.entity'

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  findAll() {
    return this.coffeeRepository.find()
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOneBy({id})

    if (!coffee) throw new NotFoundException()

    return coffee
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDto)
    console.log(coffee)

    return this.coffeeRepository.save(coffee)
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({id, ...updateCoffeeDto})

    if (!coffee) throw new NotFoundException()

    return this.coffeeRepository.save(coffee)
  }

  async remove(id: string) {
    const coffee = await this.findOne(id)

    return this.coffeeRepository.remove(coffee)
  }
}
