import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { Product } from '../schemas/product.model'
import { ProductService } from './product.service'

class MockProductModel {
  constructor(private data) {}
  new = jest.fn().mockResolvedValue(this.data)
  static findOne = jest.fn(() => {})

  // Important for chaining function with exec() should use mockReturnThis()
  // for previous function
  static find = jest.fn().mockReturnThis()
  static exec = jest.fn()
  static save = jest.fn().mockResolvedValue(1)
}

const fakeCacheManger = {
  get: jest.fn().mockResolvedValue(1),
  set: jest.fn().mockResolvedValue(1),
}

describe('ProductService', () => {
  let service: ProductService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: 'CACHE_MANAGER', useValue: fakeCacheManger },
        { provide: getModelToken(Product.name), useValue: MockProductModel },
      ],
    }).compile()

    service = module.get<ProductService>(ProductService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getAll', () => {
    it('should get all products', async () =>
      expect(await service.getAll()).toEqual(1))
  })
})
