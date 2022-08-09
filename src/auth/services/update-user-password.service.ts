import {Injectable} from '@nestjs/common'
import {Inject} from '@nestjs/common'

import {Service} from '../../common/interfaces/service'
import {EntityErrors} from '../../common/helpers/entity-errors'
import {EntityValidator} from '../../common/helpers/entity-validator'

import {UpdateUserPasswordDto} from '../dtos/update-user-password.dto'
import {AuthUserRepository} from '../repositories/auth-user.repository'
import {AuthUser} from '../entities/auth-user.entity'
import {plainToClass} from 'class-transformer'
import {EntityInvalidError} from 'src/common/errors/entity-invalid.error'

@Injectable()
export class UpdateUserPasswordService implements Service {
  constructor(
    @Inject(AuthUserRepository)
    private readonly authUserRepository: AuthUserRepository,
  ) {}

  async run(updateUserPasswordDto: UpdateUserPasswordDto) {
    let errors: EntityErrors = new EntityErrors()

    try {
      await EntityValidator.validate(updateUserPasswordDto)
    } catch (err) {
      errors = err.errors
    }

    if (
      updateUserPasswordDto.password !==
      updateUserPasswordDto.passwordConfirmation
    ) {
      errors.addError('passwordConfirmation', 'confirmation')
    }

    if (errors.hasErrors()) throw new EntityInvalidError(errors)

    const user = plainToClass(AuthUser, updateUserPasswordDto)

    user.setPassword(updateUserPasswordDto.password)

    return this.authUserRepository.update(user)
  }
}
