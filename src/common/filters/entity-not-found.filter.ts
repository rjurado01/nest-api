import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common'

import {Response} from 'express'
import {EntityNotFoundError} from 'typeorm'

// https://gist.github.com/gsusmonzon/ecd7842495f07594761e40c2758617d0
@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response.status(404).send()
  }
}
