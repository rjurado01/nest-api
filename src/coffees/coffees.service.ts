import {Inject, Injectable, NotFoundException, Scope} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {PaginationQueryDto} from '../common/dto/pagination-query.dto'
import {QueryDto} from '../common/dto/query.dto'
import {Connection, Repository} from 'typeorm'
import {CreateCoffeeFlavorDto} from './dto/create-coffee-flavor.dto'
import {CreateCoffeeDto} from './dto/create-coffee.dto'
import {UpdateCoffeeDto} from './dto/update-coffee.dto'
import {CoffeeFlavor} from './entities/coffee-flavor.entity'
import {Coffee} from './entities/coffee.entity'
import {Event} from '../events/entities/event.entity'
import {COFFEE_BRANDS} from './coffees.constants'
import {CoffeeRepository} from './coffees.repository'

@Injectable({scope: Scope.REQUEST})
export class CoffeesService {
  constructor(
    @Inject(CoffeeRepository)
    readonly coffeeRepository: CoffeeRepository<Coffee>,
  ) {}

  findAll(query: QueryDto) {
    query.page ||= new PaginationQueryDto()

    return this.coffeeRepository.findAll(query)
  }

  async findOne(id: string) {
    return await this.coffeeRepository.findById(id)
  }

  // async create(createCoffeeDto: CreateCoffeeDto) {
  //   const flavors = await Promise.all(
  //     createCoffeeDto.flavors.map(item => this.preloadFlavor(item)),
  //   )
  //   const coffee = this.coffeeRepository.create({...createCoffeeDto, flavors})

  //   return this.coffeeRepository.save(coffee)
  // }

  // async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
  //   const flavors =
  //     updateCoffeeDto.flavors &&
  //     (await Promise.all(
  //       updateCoffeeDto.flavors.map(item => this.preloadFlavor(item)),
  //     ))

  //   const coffee = await this.coffeeRepository.preload({
  //     id,
  //     ...updateCoffeeDto,
  //     flavors,
  //   })

  //   if (!coffee == null) throw new NotFoundException()

  //   return this.coffeeRepository.save(coffee)
  // }

  // async remove(id: string) {
  //   const coffee = await this.findOne(id)

  //   return this.coffeeRepository.remove(coffee)
  // }

  // async recommendCoffee(coffee: Coffee) {
  //   const queryRunner = this.connection.createQueryRunner()

  //   await queryRunner.connect()
  //   await queryRunner.startTransaction()

  //   try {
  //     coffee.recommendations++

  //     const recommendEvent = new Event()
  //     recommendEvent.name = 'recommended_coffee'
  //     recommendEvent.type = 'coffee'
  //     recommendEvent.payload = {coffeeId: coffee.id}

  //     await queryRunner.manager.save(coffee)
  //     await queryRunner.manager.save(recommendEvent)
  //     await queryRunner.commitTransaction()
  //   } catch (err) {
  //     await queryRunner.rollbackTransaction()
  //   } finally {
  //     await queryRunner.release()
  //   }
  // }

  // private async preloadFlavor(
  //   flavor: CreateCoffeeFlavorDto,
  // ): Promise<CoffeeFlavor> {
  //   const existingFlavor = await this.flavorRepository.findOne({
  //     where: {id: flavor.id},
  //   })

  //   if (existingFlavor) return Object.assign(existingFlavor, flavor)

  //   return this.flavorRepository.create(flavor)
  // }
}
