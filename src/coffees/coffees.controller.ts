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
import {QueryDto} from '../common/dto/query.dto'
import {Request} from 'express'

import {CoffeesService} from './coffees.service'
import {CreateCoffeeDto} from './dto/create-coffee.dto'
import {UpdateCoffeeDto} from './dto/update-coffee.dto'
import {Public} from '../common/decorators/publid.decorator'
import {ParseIntPipe} from '../common/pipes/parse-int.pipe'
import {Protocol} from '../common/decorators/protocol.decorator'
import {CreateCoffeeService} from './services/create-coffee.service'

@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService,
    private readonly createCoffeeService: CreateCoffeeService,
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
    return this.coffeesService.findAll(queryDto)
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: string) {
    return this.coffeesService.findOne(id)
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
