import {AutoMap} from '@automapper/classes'
import {IsDate, IsDefined, IsEmail, IsString, MinLength} from 'class-validator'
import {Column, Entity, PrimaryColumn} from 'typeorm'

@Entity()
export class Invitation {
  @PrimaryColumn()
  @IsDefined()
  @IsString()
  @AutoMap()
  id: string

  @Column()
  @IsDefined()
  @IsString()
  @AutoMap()
  role: string

  @Column()
  @IsDefined()
  @IsString()
  @IsEmail()
  @MinLength(3)
  @AutoMap()
  email: string

  @Column()
  @IsDefined()
  @IsDate()
  createdAt: Date = new Date()

  constructor() {}
}
