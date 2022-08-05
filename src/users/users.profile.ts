import {AutomapperProfile, InjectMapper} from '@automapper/nestjs'
import {createMap, Mapper} from '@automapper/core'
import {Injectable} from '@nestjs/common'
import {User} from './entities/user.entity'
import {UserListRepresentation} from './representations/user.list.representation'
import {UserShowRepresentation} from './representations/user.show.representation'

@Injectable()
export class UsersProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper)
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, User, UserListRepresentation),
        createMap(mapper, User, UserShowRepresentation)
    }
  }
}
