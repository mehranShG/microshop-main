import { Product } from 'src/schemas/product.model'
import {
  Body,
  CacheInterceptor,
  CacheKey,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { CreateDto, UpdateDto } from '../dtos/product.dto'
import { ProductService } from './product.service'

@Controller('microservice/product')
@UseInterceptors(CacheInterceptor)
export class ProductMicroController {
  constructor(private productService: ProductService) {}

  @CacheKey('cache_getAll')
  @Get()
  @MessagePattern({ name: 'all_product' })
  getAll() {
    return this.productService.getAll()
  }

  @Get(':id')
  @MessagePattern({ name: 'get_product' })
  getOneProduct(id: number) {
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

  @Put()
  @MessagePattern({ name: 'product_updated' })
  async productUpdatedRedis(payload: object) {
    const updateDto = new UpdateDto()
    updateDto.image = payload['image']
    updateDto.title = payload['title']
    return this.productService.update(payload['id'], updateDto)
  }

  @Delete()
  @MessagePattern({ name: 'product_deleted' })
  async productDeleteRedis(id: number) {
    const result = await this.productService.delete(id)
    return result
  }
}
