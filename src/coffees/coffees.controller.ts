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

@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  @Get()
  //index(@Query() { limit, offset }) {
  index(@Query() queryDto: QueryDto) {
    return this.coffeesService.findAll(queryDto)
  }

  @Get(':id')
  show(@Param('id') id: string) {
    const coffee = this.coffeesService.findOne(id)

    if (!coffee) throw new NotFoundException()

    return coffee
  }

  @Post()
  @HttpCode(201)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id)
  }
}
