import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common'

import { CoffeesService } from './coffees.service'

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  index() {
    //index(@Query() { limit, offset }) {
    return this.coffeesService.findAll()
  }

  @Get(':id')
  show(@Param('id') id: string) {
    const coffee = this.coffeesService.findOne(id)

    if (!coffee) throw new NotFoundException()

    return coffee
  }

  @Post()
  @HttpCode(201)
  create(@Body() body: any) {
    return this.coffeesService.create(body)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.coffeesService.update(id, body)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id)
  }
}
