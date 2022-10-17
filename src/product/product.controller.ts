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
  @EventPattern('hello')
  async hello(data: string) {
    console.log(data)
  }
}
