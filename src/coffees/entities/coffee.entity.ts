import {Column, Entity, PrimaryColumn} from 'typeorm'

@Entity()
export class Coffee {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  brand: string

  @Column('json', {nullable: true})
  flavors: string[]
}
