import {
  IsDefined,
  IsEmail,
  IsNumber,
  IsString,
  MinLength,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import {Column, Entity, JoinTable, ManyToMany, PrimaryColumn} from 'typeorm'

@Entity()
export class User {
  @PrimaryColumn()
  @IsDefined()
  @IsString()
  id: string

  @Column()
  @IsDefined()
  @IsString()
  @IsEmail()
  @MinLength(3)
  email: string

  @Column()
  @IsDefined()
  @IsString()
  @IsEmail()
  @MinLength(3)
  passwordDigest: string

  constructor() {}
}
