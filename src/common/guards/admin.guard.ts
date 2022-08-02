import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common'
import {ADMIN_ROLE} from '../common.constants'

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user

    // await new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve(true)
    //   }, 2000)
    // })

    // console.log(user)

    return user?.role === ADMIN_ROLE
  }
}
