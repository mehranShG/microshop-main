import { CreateDto, UpdateDto } from 'src/dtos/product.dto'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
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

  @Put(':id')
  @EventPattern('product_updated')
  async productUpdated(@Param('id') id: number, @Body() product: UpdateDto) {
    await this.productService.update((id = product.id), product)
  }

  @Delete(':id')
  @EventPattern('product_deleted')
  async productDeleted(@Param('id') id: number) {
    await this.productService.delete(id)
  }
}
