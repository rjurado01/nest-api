import {ListResultPaginationDto} from './list-result-pagination.dto'

export class ListResultDto<T> {
  data: T[]

  meta: ListResultPaginationDto

  constructor(data: T[], totalElements: number) {
    this.data = data
    this.meta = new ListResultPaginationDto(totalElements)
  }
}
