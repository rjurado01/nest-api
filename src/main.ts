import {
  ValidationPipe,
  ValidationError,
  UnprocessableEntityException,
} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {EntityInvalidFilter} from './common/filters/entity-invalid.filter'
import {EntityNotFoundFilter} from './common/filters/entity-not-found.filter'
import {HttpExceptionFilter} from './common/filters/http-exception.filter'
import {TimeoutInterceptor} from './common/interceptors/timeout.interceptor'
import {WrapResponseInterceptor} from './common/interceptors/wrap-response.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    // https://github.com/typestack/class-validator/issues/169
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: true,
      transformOptions: {enableImplicitConversion: true},
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException(errors)
      },
    }),
  )

  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  )

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new EntityNotFoundFilter(),
    new EntityInvalidFilter(),
  )

  await app.listen(3000)
}
bootstrap()
