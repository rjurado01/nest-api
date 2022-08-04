import {IsOptional, ValidateNested} from 'class-validator'

import {RepositoryQueryPaginationDto} from '../../common/dtos/repository-query-pagination.dto'
import {RepositoryQuery} from '../../common/interfaces/repository-query'

import {UsersRepositoryQueryFilterDto} from './users-repository-query-filter.dto'
import {UsersRepositoryQueryOrderDto} from './users-repository-query-order.dto'

export class ListUsersQueryDto
  implements
    RepositoryQuery<
      UsersRepositoryQueryFilterDto,
      UsersRepositoryQueryOrderDto
    >
{
  @IsOptional()
  @ValidateNested()
  filter: UsersRepositoryQueryFilterDto

  @IsOptional()
  @ValidateNested()
  order: UsersRepositoryQueryOrderDto

  @IsOptional()
  @ValidateNested()
  page: RepositoryQueryPaginationDto
}
