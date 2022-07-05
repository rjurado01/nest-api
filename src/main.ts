import {ValidationPipe, ValidationError, UnprocessableEntityException} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException(errors)
      },
    }),
  )

  await app.listen(3000)
}
bootstrap()
