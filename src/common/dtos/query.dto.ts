import {IsOptional, ValidateNested} from 'class-validator'
import {PaginationQueryDto} from './pagination-query.dto'

export class QueryDto {
  @IsOptional()
  filter: object

  @IsOptional()
  order: object

  @IsOptional()
  @ValidateNested()
  page: PaginationQueryDto = new PaginationQueryDto()
}
