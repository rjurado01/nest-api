import {AutoMap} from '@automapper/classes'

export class ListUserDto {
  @AutoMap()
  id: string

  @AutoMap()
  email: string

  @AutoMap()
  status: string
}
