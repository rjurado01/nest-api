import {Type} from 'class-transformer'
import {
  ArrayMinSize,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import {Entity} from '../../common/interfaces/entity'
import {CreateCoffeeFlavorDto} from './create-coffee-flavor.dto'

export class CoffeeDto implements Entity {
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
