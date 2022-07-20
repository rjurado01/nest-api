import {NotFoundException} from '@nestjs/common'
import {Test, TestingModule} from '@nestjs/testing'
import {getRepositoryToken} from '@nestjs/typeorm'
import {create} from 'domain'
import {Connection, Repository} from 'typeorm'
import {COFFEE_BRANDS} from './coffees.constants'
import {CoffeesService} from './coffees.service'
import {CoffeeFlavor} from './entities/coffee-flavor.entity'
import {Coffee} from './entities/coffee.entity'

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
})

describe('CoffeesService', () => {
  let service: CoffeesService
  let coffeeRepository: MockRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        {provide: Connection, useValue: {}},
        {
          provide: getRepositoryToken(CoffeeFlavor),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
        {provide: COFFEE_BRANDS, useValue: []},
      ],
    }).compile()

    // service = module.get<CoffeesService>(CoffeesService)
    service = await module.resolve(CoffeesService)
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee))
    console.log('Test:', coffeeRepository.findOne)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = '1'
        const expectedCoffee = {}

        coffeeRepository.findOne.mockReturnValue(expectedCoffee)
        const coffee = await service.findOne(coffeeId)
        expect(coffee).toEqual(expectedCoffee)
      })
    })

    describe('when coffee with ID does not exist', () => {
      it('should throw the "NotFoundException"', async () => {
        const coffeeId = '1'
        coffeeRepository.findOne.mockReturnValue(undefined)

        try {
          await service.findOne(coffeeId)
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException)
          expect(err.message).toEqual('Not Found')
        }
      })
    })
  })
})
