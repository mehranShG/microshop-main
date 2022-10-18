import { CreateDto } from 'src/dtos/product.dto'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { ApiTags } from '@nestjs/swagger'
import { ProductService } from './product.service'

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAll() {
    return this.productService.getAll()
  }

  @Post()
  @EventPattern('product_created')
  async productCreate(@Body() product: CreateDto) {
    const createDto = new CreateDto()
    createDto.id = product.id
    createDto.title = product.title
    createDto.image = product.image
    createDto.likes = product.likes
    const result = await this.productService.create(createDto)
    return result
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
