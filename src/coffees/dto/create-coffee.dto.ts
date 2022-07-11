import {Type} from 'class-transformer'
import {
  ArrayMinSize,
  IsString,
  MinLength,
  Validate,
  ValidateNested,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import {CreateCoffeeFlavorDto} from './create-coffee-flavor.dto'

@ValidatorConstraint({name: 'moreThanOne', async: false})
class MoreThanOne implements ValidatorConstraintInterface {
  validate(value: number): boolean {
    return value > 1
  }

  defaultMessage(_args: ValidationArguments) {
    return 'No plural'
  }
}

export class CreateCoffeeDto {
  @IsString()
  readonly id: string

  @Validate(MoreThanOne)
  readonly count: number

  @IsString()
  @MinLength(3)
  readonly title: string

  @IsString()
  readonly brand: string

  @ValidateNested({each: true})
  @Type(() => CreateCoffeeFlavorDto)
  @ArrayMinSize(1)
  readonly flavors: CreateCoffeeFlavorDto[]
}
