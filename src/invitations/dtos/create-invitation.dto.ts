import {AutoMap} from '@automapper/classes'
import {IsEmail, IsOptional, IsString} from 'class-validator'
import {Entity} from 'typeorm'

@Entity()
export class CreateInvitationDto {
  @IsOptional()
  @IsString()
  @AutoMap()
  id: string

  @IsOptional()
  @IsString()
  @AutoMap()
  role: string

  @IsOptional()
  @IsEmail()
  @AutoMap()
  email: string

  constructor() {}
}
