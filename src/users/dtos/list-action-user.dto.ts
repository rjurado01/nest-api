import {AutoMap} from '@automapper/classes'

export class ListActionUserDto {
  @AutoMap()
  id: string

  @AutoMap()
  email: string

  @AutoMap()
  status: string
}
