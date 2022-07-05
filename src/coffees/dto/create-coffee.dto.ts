import {IsString, MinLength} from 'class-validator'

export class CreateCoffeeDto {
  @IsString()
  readonly id: string

  @IsString()
  @MinLength(3)
  readonly name: string

  @IsString()
  readonly brand: string

  @IsString({each: true})
  readonly flavors: string[]
}
