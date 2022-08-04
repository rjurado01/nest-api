import {AutoMap} from '@automapper/classes'

export class ListUserRepresentation {
  @AutoMap()
  id: string

  @AutoMap()
  email: string

  @AutoMap()
  status: string
}
