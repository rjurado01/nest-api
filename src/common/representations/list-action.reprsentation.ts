class ListActionMeta {
  totalElements: number
}

export class ListActionRepresentation<T> {
  data: T[]

  meta: ListActionMeta

  constructor(data: T[], meta: ListActionMeta) {
    this.data = data
    this.meta = meta
  }
}
