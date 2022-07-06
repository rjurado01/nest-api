import {IsObject, IsString, MinLength} from 'class-validator'
import {CreateCoffeeFlavorDto} from './create-coffee-flavor.dto'

export class CreateCoffeeDto {
  @IsString()
  readonly id: string

  @IsString()
  @MinLength(3)
  readonly name: string

  @IsString()
  readonly brand: string

  @IsObject({each: true})
  readonly flavors: CreateCoffeeFlavorDto[]
}
