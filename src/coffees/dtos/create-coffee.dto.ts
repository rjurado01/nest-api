import {Type} from 'class-transformer'
import {
  ArrayMinSize,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import {CreateCoffeeFlavorDto} from './create-coffee-flavor.dto'

export class CreateCoffeeDto {
  @IsString()
  @IsOptional()
  readonly id: string

  @IsString()
  @IsOptional()
  readonly title: string

  @IsString()
  @IsOptional()
  readonly brand: string

  @ValidateNested({each: true})
  @Type(() => CreateCoffeeFlavorDto)
  @ArrayMinSize(1)
  @IsOptional()
  readonly flavors: CreateCoffeeFlavorDto[]
}
