import { Injectable } from '@nestjs/common'
import { Coffee } from './entities/coffee.entity'

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'A',
      flavors: ['F1', 'F2'],
    },
  ]

  findAll() {
    return this.coffees
  }

  findOne(id: string) {
    return this.coffees.find(item => item.id === +id)
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto)
  }

  update(id: string, updateCoffeeDto: any) {
    const coffee = this.findOne(id)

    Object.assign(coffee, updateCoffeeDto)
  }

  remove(id: string) {
    console.log(id)
    const index = this.coffees.findIndex(item => item.id === +id)

    if (index >= -1) this.coffees.splice(index, 1)
  }
}
