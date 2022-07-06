import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {PaginationQueryDto} from 'src/common/dto/pagination-query.dto'
import {QueryDto} from 'src/common/dto/query.dto'
import {Repository} from 'typeorm'
import {CreateCoffeeFlavorDto} from './dto/create-coffee-flavor.dto'
import {CreateCoffeeDto} from './dto/create-coffee.dto'
import {UpdateCoffeeDto} from './dto/update-coffee.dto'
import {CoffeeFlavor} from './entities/coffee-flavor.entity'
import {Coffee} from './entities/coffee.entity'

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(CoffeeFlavor)
    private readonly flavorRepository: Repository<CoffeeFlavor>,
  ) {}

  findAll(query: QueryDto) {
    const page: PaginationQueryDto = query.page || new PaginationQueryDto()

    return this.coffeeRepository.find({
      skip: (page.number - 1) * page.size,
      take: page.size,
    })
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({
      where: {id},
      relations: ['flavors'],
    })

    if (!coffee) throw new NotFoundException()

    return coffee
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map(item => this.preloadFlavor(item)),
    )
    const coffee = this.coffeeRepository.create({...createCoffeeDto, flavors})

    return this.coffeeRepository.save(coffee)
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map(item => this.preloadFlavor(item)),
      ))

    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
      flavors,
    })

    if (!coffee == null) throw new NotFoundException()

    return this.coffeeRepository.save(coffee)
  }

  async remove(id: string) {
    const coffee = await this.findOne(id)

    return this.coffeeRepository.remove(coffee)
  }

  private async preloadFlavor(
    flavor: CreateCoffeeFlavorDto,
  ): Promise<CoffeeFlavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: {id: flavor.id},
    })

    if (existingFlavor) return Object.assign(existingFlavor, flavor)

    return this.flavorRepository.create(flavor)
  }
}
