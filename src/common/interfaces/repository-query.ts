import {RepositoryQueryPaginationDto} from '../dtos/repository-query-pagination.dto'

// Es una interfaz ya que no soporta validadores sobre clases genéricas
// https://github.com/typestack/class-validator/issues/257
export interface RepositoryQuery<FilterDto, OrderDto> {
  filter: FilterDto

  order: OrderDto

  page: RepositoryQueryPaginationDto
}
