import {ListUsersFiltersDto} from '../dtos/list-users-filters.dto'
import {ListUsersQueryDto} from '../dtos/list-users-query.dto'
import {User} from '../entities/user.entity'

export interface UserRepository {
  findAll(query: ListUsersQueryDto): Promise<User[]>
  count(filter: ListUsersFiltersDto): Promise<number>
}

export const UserRepository = Symbol('UserRepository')
