import {Column, Entity, ManyToMany, PrimaryColumn} from 'typeorm'
import {Coffee} from './coffee.entity'

@Entity()
export class CoffeeFlavor {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @ManyToMany(() => Coffee, coffee => coffee.flavors)
  coffees: Coffee[]
}
