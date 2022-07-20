import {IsString} from 'class-validator'

export class CreateCoffeeFlavorDto {
  @IsString()
  readonly id: string

  @IsString()
  readonly name: string
}
