import {User} from '../entities/user.entity'
import {QueryDto} from '../../common/dtos/query.dto'

export interface UserRepository {
  findAll(query: QueryDto): Promise<User[]>
}

export const UserRepository = Symbol('UserRepository')
