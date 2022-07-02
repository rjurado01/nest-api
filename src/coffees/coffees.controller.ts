import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'

@Controller('coffees')
export class CoffeesController {
  @Get()
  index(@Query() { limit, offset }) {
    return `index coffees, limit: ${limit}, offset: ${offset}`
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return `show coffee ${id}`
  }

  @Post()
  @HttpCode(201)
  create(@Body() body: any) {
    return body
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return `path coffee ${id} with ${body}`
  }

  @Delete()
  remove(@Param('id') id: string) {
    return `remove coffe ${id}`
  }
}
