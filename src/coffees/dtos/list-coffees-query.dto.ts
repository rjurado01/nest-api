import {IsOptional, ValidateNested} from 'class-validator'

import {RepositoryQuery} from '../../common/interfaces/repository-query'
import {ListCoffeesFiltersDto} from './list-coffees-filters.dto'
import {RepositoryQueryPaginationDto} from '../../common/dtos/repository-query-pagination.dto'

export class ListCoffeesQueryDto
  implements RepositoryQuery<ListCoffeesFiltersDto, unknown>
{
  @IsOptional()
  @ValidateNested()
  filter: ListCoffeesFiltersDto

  @IsOptional()
  order: null

  @IsOptional()
  @ValidateNested()
  page = new RepositoryQueryPaginationDto() // paginación por defecto
}
