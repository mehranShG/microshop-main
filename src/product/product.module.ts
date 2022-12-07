import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Product, ProductSchema } from '../schemas/product.model'
import { ProductMicroController } from './product-microservice.controller'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductMicroController, ProductController],
  providers: [ProductService],
})
export class ProductModule {}
