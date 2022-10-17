import { CreateDto } from 'src/dtos/product.dto'
import { Controller, Get } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAll() {
    return this.productService.getAll()
  }
  @EventPattern('product_created')
  async productCreate(product: any) {
    const createDto = new CreateDto()
    createDto.id = product.id
    createDto.title = product.title
    createDto.image = product.image
    createDto.likes = product.likes
    this.productService.create(createDto)
  }

  @EventPattern('product_updated')
  async productUpdated(product: any) {
    const createDto = new CreateDto()
    createDto.id = product.id
    createDto.title = product.title
    createDto.image = product.image
    createDto.likes = product.likes
    await this.productService.update(product.id, createDto)
  }

  @EventPattern('product_deleted')
  async productDeleted(id: number) {
    await this.productService.delete(id)
  }
}
