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
} from '@nestjs/common'
import {REQUEST} from '@nestjs/core'
import {QueryDto} from '../common/dtos/query.dto'
import {Request} from 'express'

import {CreateCoffeeDto} from './dtos/create-coffee.dto'
import {UpdateCoffeeDto} from './dtos/update-coffee.dto'

import {CoffeesService} from './services/coffees.service'
import {ListCoffeesService} from './services/list-coffees.service'
import {ShowCoffeeService} from './services/show-coffee.service'
import {CreateCoffeeService} from './services/create-coffee.service'

import {Public} from '../common/decorators/publid.decorator'
import {ParseIntPipe} from '../common/pipes/parse-int.pipe'
import {Protocol} from '../common/decorators/protocol.decorator'

@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService,
    private readonly createCoffeeService: CreateCoffeeService,
    private readonly listCoffeesService: ListCoffeesService,
    private readonly showCoffeeService: ShowCoffeeService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  @Public()
  @Get()
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
  show(@Param('id', ParseIntPipe) id: string) {
    return this.showCoffeeService.run(id)
  }

  @Post()
  @HttpCode(201)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.createCoffeeService.run(createCoffeeDto)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
  //   return this.coffeesService.update(id, updateCoffeeDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.coffeesService.remove(id)
  // }
}
