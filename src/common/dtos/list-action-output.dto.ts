class ListActionMetaDto {
  totalElements: number
}

export class ListActionOutputDto<T> {
  data: T[]

  meta: ListActionMetaDto

  constructor(data: T[], meta: ListActionMetaDto) {
    this.data = data
    this.meta = meta
  }
}
