import {DataSource} from 'typeorm'
import {SnakeNamingStrategy} from 'typeorm-naming-strategies'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'rjurado',
  database: 'nest_api_dev',
  synchronize: false,
  name: 'default',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy(),
})
