import { Product } from 'src/schemas/product.model'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { ApiTags } from '@nestjs/swagger'
import { CreateDto, UpdateDto } from '../dtos/product.dto'
import { ProductService } from './product.service'

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAll() {
    return this.productService.getAll()
  }

  @Get(':id')
  @MessagePattern({ name: 'get_product' })
  getOne(@Param('id') id: number) {
    return this.productService.getOne(id)
  }

  @Post()
  @MessagePattern({ name: 'product_created' })
  async addProduct(@Body() product: CreateDto) {
    const createDto = new Product()
    createDto.title = product.title
    createDto.image = product.image
    createDto.likes = product.likes
    const result = await this.productService.addProduct(createDto)

    return result
  }

  @Put(':id')
  @MessagePattern({ name: 'product_updated' })
  async productUpdated(@Param('id') id: number, @Body() product: UpdateDto) {
    return this.productService.update(id || product.id, product)
  }

  @Delete(':id')
  @MessagePattern({ name: 'product_deleted' })
  async productDeleted(@Param('id') id: number) {
    const result = await this.productService.delete(id)
    return result
  }
}
