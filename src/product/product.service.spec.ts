import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { UpdateDto } from '../dtos/product.dto'
import { Product } from '../schemas/product.model'
import { ProductService } from './product.service'

class MockProductModel {
  constructor(private data) {}
  new = jest.fn().mockResolvedValue(this.data)
  static findOne = jest.fn().mockResolvedValue({ id: 1, name: 'apples' })
  // Important for chaining function with exec() should use mockReturnThis()
  // for previous function
  static find = jest.fn().mockReturnThis()
  static exec = jest.fn()
  static save = jest.fn().mockResolvedValue(1)
  static findOneAndUpdate = jest.fn().mockResolvedValue({
    id: 2,
    name: 'orange',
  })
  static deleteOne = jest.fn().mockResolvedValue(true)
}

const fakeCacheManger = {
  get: jest.fn().mockResolvedValue({ id: 1, name: 'apples' }),

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
      expect(await service.getAll()).toEqual({ id: 1, name: 'apples' }))
  })

  describe('getOne', () => {
    it('should get one product', async () =>
      expect(await service.getOne(1)).toEqual({ id: 1, name: 'apples' }))
  })

  describe('findOne', () => {
    it('should get one product', async () =>
      expect(await service.findOne(1)).toEqual({ id: 1, name: 'apples' }))
  })

  describe('update', () => {
    const productDto = new UpdateDto()
    it('should update product', async () =>
      expect(await service.update(1, productDto)).toEqual({
        id: 1,
        name: 'apples',
      }))
  })

  describe('delete', () => {
    const productDto = new UpdateDto()
    it('should delete product', async () =>
      expect(await service.delete(1)).toBeTruthy)
  })
})
