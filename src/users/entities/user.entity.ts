import {AutoMap} from '@automapper/classes'
import {IsDefined, IsEmail, IsString, MinLength} from 'class-validator'
import {Column, Entity, PrimaryColumn} from 'typeorm'

@Entity()
export class User {
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
  @AutoMap()
  status: string

  @Column()
  @IsDefined()
  @IsString()
  @IsEmail()
  @MinLength(3)
  @AutoMap()
  email: string

  constructor() {}
}
