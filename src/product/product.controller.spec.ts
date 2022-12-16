import { Test, TestingModule } from '@nestjs/testing'
import { CreateDto } from '../dtos/product.dto'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

const mockProductService = {
  getAll: jest.fn().mockResolvedValue([1, 2, 3, 4]),
  addProduct: jest.fn().mockResolvedValue({ id: 1, title: 'tree.png' }),
  update: jest.fn().mockResolvedValue({ id: 2, title: 'trees.png' }),
  delete: jest.fn().mockResolvedValue({}),
  getOne: jest.fn().mockResolvedValue({ id: 1, name: 'apples' }),
}

describe('ProductController', () => {
  let controller: ProductController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    })
      .overrideProvider(ProductService)
      .useValue(mockProductService)
      .compile()

    controller = module.get<ProductController>(ProductController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('getAll', () => {
    it('should get all products', async () => {
      expect(await controller.getAll()).toEqual([1, 2, 3, 4])
    })
  })

  describe('createProudct', () => {
    it('should create product', async () => {
      const product = new CreateDto()
      expect(await controller.addProduct(product)).toEqual({
        id: 1,
        title: 'tree.png',
      })
    })
  })
  describe('productUpdated', () => {
    it('should update product', async () => {
      const product = new CreateDto()
      expect(await controller.productUpdated(1, product)).toEqual({
        id: 2,
        title: 'trees.png',
      })
    })
  })

  describe('productDeleted', () => {
    it('should delete product', async () => {
      const product = new CreateDto()
      expect(await controller.productDeleted(1)).toEqual({})
    })
  })

  describe('getOne', () => {
    it('should get a product', async () => {
      expect(await controller.getOne(1)).toEqual({ id: 1, name: 'apples' })
    })
  })
})
