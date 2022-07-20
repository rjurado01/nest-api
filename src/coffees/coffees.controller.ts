import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import {REQUEST} from '@nestjs/core'
import {QueryDto} from '../common/dtos/query.dto'
import {Request} from 'express'

import {CoffeeDto} from './dtos/coffee.dto'

import {ListCoffeesService} from './services/list-coffees.service'
import {ShowCoffeeService} from './services/show-coffee.service'
import {CreateCoffeeService} from './services/create-coffee.service'
import {UpdateCoffeeService} from './services/update-coffee.service'
import {RemoveCoffeeService} from './services/remove-coffee.service'

import {Public} from '../common/decorators/publid.decorator'
import {Protocol} from '../common/decorators/protocol.decorator'
import {AdminGuard} from 'src/common/guards/admin.guard'

@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly createCoffeeService: CreateCoffeeService,
    private readonly listCoffeesService: ListCoffeesService,
    private readonly showCoffeeService: ShowCoffeeService,
    private readonly updateCoffeeService: UpdateCoffeeService,
    private readonly removeCoffeeService: RemoveCoffeeService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  @Public()
  @Get()
  @UseGuards(AdminGuard)
  //index(@Query() { limit, offset }) {
  async index(
    @Protocol('https') protocol: string,
    @Query() queryDto: QueryDto,
  ) {
    console.log(`protocol: ${protocol}`)
    // const rand = Math.random() < 0.5
    // if (rand) await new Promise(resolve => setTimeout(resolve, 5000))
    return this.listCoffeesService.run(queryDto)
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.showCoffeeService.run(id)
  }

  @Post()
  @HttpCode(201)
  create(@Body() coffeeDto: CoffeeDto) {
    return this.createCoffeeService.run(coffeeDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() coffeeDto: CoffeeDto) {
    return this.updateCoffeeService.run({...coffeeDto, id})
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeCoffeeService.run(id)
  }
}
