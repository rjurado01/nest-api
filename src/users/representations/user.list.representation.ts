import {AutoMap} from '@automapper/classes'

export class UserListRepresentation {
  @AutoMap()
  id: string

  @AutoMap()
  email: string

  @AutoMap()
  status: string
}
