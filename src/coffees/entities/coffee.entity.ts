import {Column, Entity, JoinTable, ManyToMany, PrimaryColumn} from 'typeorm'
import {CoffeeFlavor} from './coffee-flavor.entity'

@Entity()
export class Coffee {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  brand: string

  @JoinTable()
  @ManyToMany(() => CoffeeFlavor, flavor => flavor.coffees)
  flavors: string[]
}
