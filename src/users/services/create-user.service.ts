import {Injectable} from '@nestjs/common'
import {Inject} from '@nestjs/common'

import {User} from '../entities/user.entity'
import {UserDto} from '../dtos/user.dto'
import {UserRepository} from '../repositories/users.repository'
import {Service} from '../../common/interfaces/service'
import {EntityInvalidError} from '../../common/errors/entity-invalid.error'
import {EntityErrors} from '../../common/helpers/entity-errors'
import {EntityMapper} from '../../common/helpers/entity-mapper'

@Injectable()
export class CreateUserService implements Service {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async run(createUserDto: UserDto) {
    console.log(createUserDto)
    let errors: EntityErrors = new EntityErrors()
    let user: User = null

    try {
      user = await EntityMapper.dtoToEntity(User, createUserDto)
    } catch (err) {
      errors = err.errors
    }

    try {
      await this.userRepository.findById(createUserDto.id)
      errors.addError('id', 'taken', {value: createUserDto.id})
    } catch (err) {}

    if (errors.hasErrors()) throw new EntityInvalidError(errors)

    await this.userRepository.create(user)
  }
}
