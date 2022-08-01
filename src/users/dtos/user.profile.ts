import {AutomapperProfile, InjectMapper} from '@automapper/nestjs'
import {createMap, Mapper, MappingProfile} from '@automapper/core'
import {Injectable} from '@nestjs/common'
import {User} from '../entities/user.entity'
import {ListUserDto} from './list-user.dto'

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper)
  }

  override get profile() {
    return mapper => {
      createMap(mapper, User, ListUserDto)
    }
  }
}
