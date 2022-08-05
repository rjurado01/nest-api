import {Injectable} from '@nestjs/common'
import {Inject} from '@nestjs/common'

import {Service} from '../../common/interfaces/service'

import {UserRepository} from '../repositories/users.repository'

@Injectable()
export class ShowUserService implements Service {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async run(id: string) {
    return this.userRepository.findById(id)
  }
}
