import {Module, NestModule, MiddlewareConsumer, Global} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {EntityManager} from './helpers/entity-manager'
import {LoggingMiddleware} from './middleware/logging.middleware'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [EntityManager],
  exports: [EntityManager],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*')
  }
}
