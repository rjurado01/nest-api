export class EntityErrors {
  errors = {}

  addError(field: string, error: string, info: {[key: string]: any} = {}) {
    this.errors[field] ||= []

    this.errors[field].push({error: error, ...info})
  }

  hasErrors() {
    return Object.keys(this.errors).length > 0
  }
}
