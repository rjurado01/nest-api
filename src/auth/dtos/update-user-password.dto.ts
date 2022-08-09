import {IsString, Matches, MinLength} from 'class-validator'

export class UpdateUserPasswordDto {
  @IsString()
  id: string

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/) // TODO: sacar constante
  password: string

  @IsString()
  @MinLength(8)
  passwordConfirmation: string
}
