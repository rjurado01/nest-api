import {Inject} from '@nestjs/common'

import {EntityManager} from '../../common/helpers/entity-manager'

export function Transaction() {
  const injectManager = Inject(EntityManager)

  return (
    target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    // this is the same as using constructor(private readonly logger: EntityManager) in a class
    injectManager(target, 'manager')

    //get original method
    const originalMethod = descriptor.value

    //redefine descriptor value within own function block
    descriptor.value = async function (...args: any[]) {
      const result = this.manager.runInTransaction(() => {
        return originalMethod.apply(this, args)
      })

      return result
    }
  }
}
