import {
  ValidationPipe,
  ValidationError,
  UnprocessableEntityException,
} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    // https://github.com/typestack/class-validator/issues/169
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {enableImplicitConversion: true},
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException(errors)
      },
    }),
  )

  await app.listen(3000)
}
bootstrap()
