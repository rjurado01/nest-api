class ListServiceMetaDto {
  totalElements: number

  constructor(totalElements: number) {
    this.totalElements = totalElements
  }
}

export class ListServiceOutputDto<T> {
  data: T[]

  meta: ListServiceMetaDto

  constructor(data: T[], totalElements: number) {
    this.data = data
    this.meta = new ListServiceMetaDto(totalElements)
  }
}
