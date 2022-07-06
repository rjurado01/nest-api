import {Type} from 'class-transformer'
import {IsString, MinLength, ValidateNested} from 'class-validator'
import {CreateCoffeeFlavorDto} from './create-coffee-flavor.dto'

export class CreateCoffeeDto {
  @IsString()
  readonly id: string

  @IsString()
  @MinLength(3)
  readonly name: string

  @IsString()
  readonly brand: string

  @ValidateNested({each: true})
  @Type(() => CreateCoffeeFlavorDto)
  readonly flavors: CreateCoffeeFlavorDto[]
}
