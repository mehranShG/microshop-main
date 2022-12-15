import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { Product } from '../schemas/product.model'
import { ProductService } from './product.service'

class MockProductModel {
  constructor(private data) {}
  findOne = jest.fn(() => {})
  save = jest.fn().mockResolvedValue(this.data)
  static findOne = jest.fn()
}

describe('ProductService', () => {
  let service: ProductService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: 'CACHE_MANAGER', useValue: {} },
        { provide: getModelToken(Product.name), useValue: MockProductModel },
      ],
    }).compile()

    service = module.get<ProductService>(ProductService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
