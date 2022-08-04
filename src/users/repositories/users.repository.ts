import {UsersRepositoryQueryFilterDto} from '../dtos/users.repository-query-filter.dto'
import {UsersRepositoryQueryDto} from '../dtos/users.repository-query.dto'
import {User} from '../entities/user.entity'

export interface UserRepository {
  findAll(query: UsersRepositoryQueryDto): Promise<User[]>
  count(filter: UsersRepositoryQueryFilterDto): Promise<number>
}

export const UserRepository = Symbol('UserRepository')
