import {Test, TestingModule} from '@nestjs/testing'
import {getRepositoryToken} from '@nestjs/typeorm'
import {Connection} from 'typeorm'
import {COFFEE_BRANDS} from './coffees.constants'
import {CoffeesService} from './coffees.service'
import {CoffeeFlavor} from './entities/coffee-flavor.entity'
import {Coffee} from './entities/coffee.entity'

describe('CoffeesService', () => {
  let service: CoffeesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        {provide: Connection, useValue: {}},
        {provide: getRepositoryToken(CoffeeFlavor), useValue: {}},
        {provide: getRepositoryToken(Coffee), useValue: {}},
        {provide: COFFEE_BRANDS, useValue: []},
      ],
    }).compile()

    // service = module.get<CoffeesService>(CoffeesService)
    service = await module.resolve(CoffeesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
