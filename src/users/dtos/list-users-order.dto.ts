import {OrderDirs} from '../../common/common.constants'

import {IsEnum, IsOptional} from 'class-validator'

export class ListUsersOrderDto {
  @IsOptional()
  @IsEnum(OrderDirs)
  createdAt: OrderDirs
}
