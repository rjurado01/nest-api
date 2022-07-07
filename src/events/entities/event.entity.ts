import {Column, Entity, Index, PrimaryColumn} from 'typeorm'

@Entity()
export class Event {
  @PrimaryColumn()
  id: number

  @Index()
  @Column()
  type: string

  @Column()
  name: string

  @Column('json')
  payload: Record<string, any>
}
