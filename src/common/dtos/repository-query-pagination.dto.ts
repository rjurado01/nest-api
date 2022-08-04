import {Type} from 'class-transformer'
import {IsOptional, IsPositive} from 'class-validator'

export class RepositoryQueryPaginationDto {
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  number = 1

  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  size = 2
}
