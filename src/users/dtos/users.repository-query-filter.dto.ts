import {IsOptional, IsString} from 'class-validator'

export class UsersRepositoryQueryFilterDto {
  @IsOptional()
  @IsString()
  email: string

  @IsOptional()
  @IsString({each: true})
  emails: string[]
}
