import {IsDefined, IsEmail, IsString} from 'class-validator'
import {Column, Entity, PrimaryColumn} from 'typeorm'
import {createHash} from 'crypto'

@Entity('user')
export class AuthUser {
  @PrimaryColumn()
  @IsDefined()
  @IsString()
  id: string

  @Column()
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string

  @Column()
  @IsDefined()
  @IsString()
  passwordDigest: string

  constructor() {}

  validate(password: string) {
    return this.passwordDigest == this.encryptPass(password)
  }

  private encryptPass(password: string) {
    return createHash('sha256').update(password).digest('base64')
  }
}
