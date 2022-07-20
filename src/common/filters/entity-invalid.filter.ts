import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common'
import {Response} from 'express'

import {EntityInvalidError} from '../errors/entity-invalid.error'

// https://gist.github.com/gsusmonzon/ecd7842495f07594761e40c2758617d0
@Catch(EntityInvalidError)
export class EntityInvalidFilter implements ExceptionFilter {
  catch(exception: EntityInvalidError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response.status(422).json(exception.errors)
  }
}
