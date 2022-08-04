import {IsOptional, ValidateNested} from 'class-validator'
import {ListUsersFiltersDto} from './list-users-filters.dto'
import {ListUsersOrderDto} from './list-users-order.dto'
import {RepositoryQueryPaginationDto} from '../../common/dtos/repository-query-pagination.dto'
import {RepositoryQuery} from '../../common/interfaces/repository-query'

export class ListUsersQueryDto
  implements RepositoryQuery<ListUsersFiltersDto, ListUsersOrderDto>
{
  @IsOptional()
  @ValidateNested()
  filter: ListUsersFiltersDto

  @IsOptional()
  @ValidateNested()
  order: ListUsersOrderDto

  @IsOptional()
  @ValidateNested()
  page: RepositoryQueryPaginationDto
}
