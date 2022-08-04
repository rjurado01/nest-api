import {IsOptional, IsString} from 'class-validator'

export class ListUsersFiltersDto {
  @IsOptional()
  @IsString()
  email: string
}
