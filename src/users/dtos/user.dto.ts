import {IsEmail, IsOptional, IsString} from 'class-validator'
import {AutoMap} from '@automapper/classes'
import {Entity} from 'src/common/interfaces/entity'

export class UserDto implements Entity {
  @IsString()
  @IsOptional()
  readonly id: string

  @IsString()
  @AutoMap()
  readonly role: string

  @IsString()
  @AutoMap()
  readonly status: string

  @IsString()
  @IsEmail()
  @AutoMap()
  readonly email: string
}
