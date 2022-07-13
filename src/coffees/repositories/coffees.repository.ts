import {Repository} from '../../common/repository'

export type CoffeeRepository<E> = Repository<E>

export const CoffeeRepository = Symbol('CoffeeRepository')
