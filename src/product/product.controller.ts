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
  async create(product: any) {
    const createDto = new CreateDto()
    createDto.title = product.title
    createDto.image = product.image
    createDto.likes = product.likes
    this.productService.create(createDto)
  }
}
