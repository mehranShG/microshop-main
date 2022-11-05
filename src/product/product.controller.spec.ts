import { Test, TestingModule } from '@nestjs/testing'
import { CreateDto } from '../dtos/product.dto'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

const mockProductService = {
  getAll: jest.fn().mockReturnValue([1, 2, 3, 4]),
  create: jest.fn().mockResolvedValue({ id: 1, title: 'tree.png' }),
  update: jest.fn().mockResolvedValue({ id: 2, title: 'trees.png' }),
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
    it('should be defined', () => {
      expect(controller.getAll()).toEqual([1, 2, 3, 4])
    })
  })

  describe('createProudct', () => {
    it('should create product', async () => {
      const product = new CreateDto()
      expect(await controller.productCreate(product)).toEqual({
        id: 1,
        title: 'tree.png',
      })
    })
  })
  describe('productUpdate', () => {
    it('should update product', async () => {
      const product = new CreateDto()
      expect(await controller.productUpdated(1, product)).toEqual({
        id: 2,
        title: 'trees.png',
      })
    })
  })
})
