import {IsOptional, IsString} from 'class-validator'

export class CreateMassiveInvitationsEntryDto {
  @IsOptional()
  @IsString({each: true})
  emails: string[]

  @IsOptional()
  @IsString()
  role: string
}
