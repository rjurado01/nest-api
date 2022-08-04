import {IsOptional, IsString, IsEnum, ValidateNested} from 'class-validator'

import {RepositoryQueryPaginationDto} from '../../common/dtos/repository-query-pagination.dto'
import {RepositoryQuery} from '../../common/interfaces/repository-query'
import {OrderDirs} from '../../common/common.constants'

class UsersRepositoryQueryFilterDto {
  @IsOptional()
  @IsString()
  email: string
}

class UsersRepositoryQueryOrderDto {
  @IsOptional()
  @IsEnum(OrderDirs)
  createdAt: OrderDirs
}

export class UsersRepositoryQueryDto
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
