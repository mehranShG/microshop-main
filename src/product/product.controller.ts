import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateDto, UpdateDto } from '../dtos/product.dto'
import { Product } from '../schemas/product.model'
import { ProductService } from './product.service'

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAll() {
    return this.productService.getAll()
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.productService.getOne(id)
  }

  @Post()
  async addProduct(@Body() product: CreateDto) {
    const createDto = new Product()
    createDto.title = product.title
    createDto.image = product.image
    createDto.likes = product.likes
    const result = await this.productService.addProduct(createDto)
    return result
  }

  @Put(':id')
  async productUpdated(@Param('id') id: number, @Body() product: UpdateDto) {
    return this.productService.update(id || product.id, product)
  }

  @Delete(':id')
  async productDeleted(@Param('id') id: number) {
    const result = await this.productService.delete(id)
    return result
  }
}
