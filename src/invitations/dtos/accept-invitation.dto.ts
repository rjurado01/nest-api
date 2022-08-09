import {IsString} from 'class-validator'
import {Entity} from 'typeorm'

@Entity()
export class AcceptInvitationDto {
  @IsString()
  id: string

  @IsString()
  password: string

  @IsString()
  passwordConfirmation: string
}
