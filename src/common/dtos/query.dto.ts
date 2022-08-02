import {IsOptional, ValidateNested} from 'class-validator'
import {PaginationQueryDto} from './pagination-query.dto'

export class QueryDto<F> {
  @IsOptional()
  filter: F

  @IsOptional()
  order: object

  @IsOptional()
  @ValidateNested()
  page: PaginationQueryDto = new PaginationQueryDto()
}
