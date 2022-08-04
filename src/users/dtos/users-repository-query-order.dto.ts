import {OrderDirs} from '../../common/common.constants'

import {IsEnum, IsOptional} from 'class-validator'

export class UsersRepositoryQueryOrderDto {
  @IsOptional()
  @IsEnum(OrderDirs)
  createdAt: OrderDirs
}
