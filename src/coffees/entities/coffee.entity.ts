import {Column, Entity, JoinTable, ManyToMany, PrimaryColumn} from 'typeorm'
import {CoffeeFlavor} from './coffee-flavor.entity'

@Entity()
export class Coffee {
  @PrimaryColumn()
  id: string

  @Column()
  title: string

  @Column()
  brand: string

  @Column({default: 0})
  recommendations: number

  @JoinTable()
  @ManyToMany(() => CoffeeFlavor, flavor => flavor.coffees, {cascade: true})
  flavors: CoffeeFlavor[]
}
