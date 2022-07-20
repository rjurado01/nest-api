import {
  IsDefined,
  IsNumber,
  IsString,
  MinLength,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import {Column, Entity, JoinTable, ManyToMany, PrimaryColumn} from 'typeorm'
import {CoffeeFlavor} from './coffee-flavor.entity'

@ValidatorConstraint({name: 'moreThanOne', async: false})
class NotNegative implements ValidatorConstraintInterface {
  validate(value: number): boolean {
    return value > -1
  }

  defaultMessage(_args: ValidationArguments) {
    return 'No plural'
  }
}

@Entity()
export class Coffee {
  @PrimaryColumn()
  @IsDefined()
  @IsString()
  id: string

  @Column()
  @IsDefined()
  @IsString()
  @MinLength(3)
  title: string

  @Column()
  @IsDefined()
  @IsString()
  brand: string

  @Column({default: 0})
  @IsDefined()
  @IsNumber()
  @Validate(NotNegative)
  recommendations: number

  @JoinTable()
  @ManyToMany(() => CoffeeFlavor, flavor => flavor.coffees, {cascade: true})
  flavors: CoffeeFlavor[]

  constructor() {
    this.recommendations ||= 0
  }
}
