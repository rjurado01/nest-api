import {CoffeesModule} from '../../src/coffees/coffees.module'
import {
  INestApplication,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common'
import {Test, TestingModule} from '@nestjs/testing'
import {TypeOrmModule} from '@nestjs/typeorm'
import * as request from 'supertest'
import {CreateCoffeeDto} from 'src/coffees/dto/create-coffee.dto'

describe('[Feature] Coffees - /coffees', () => {
  let app: INestApplication

  const coffee = {
    id: 'C1',
    title: 'Coffee A',
    brand: 'Ba',
    count: 3,
    flavors: [{id: 'F1', name: 'F1'}],
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: process.env.POSTGRES_USER,
          database: 'nest_api_test',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
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
    await app.init()
  })

  it('Create [POST /]', () => {
    return request(app.getHttpServer())
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(201)
  })

  it.todo('Create [GET /]')

  afterAll(async () => {
    await app.close()
  })
})
