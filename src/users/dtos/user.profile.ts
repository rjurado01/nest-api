import {AutomapperProfile, InjectMapper} from '@automapper/nestjs'
import {createMap, Mapper} from '@automapper/core'
import {Injectable} from '@nestjs/common'
import {User} from '../entities/user.entity'
import {ListActionUserDto} from './list-action-user.dto'

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper)
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, User, ListActionUserDto)
    }
  }
}
