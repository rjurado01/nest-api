import {User} from '../entities/user.entity'
import {QueryDto} from '../../common/dtos/query.dto'
import {ListUsersFiltersDto} from '../dtos/list-users-filters.dto'

export interface UserRepository {
  findAll(query: QueryDto<ListUsersFiltersDto>): Promise<User[]>
  count(filter: object): Promise<number>
}

export const UserRepository = Symbol('UserRepository')
