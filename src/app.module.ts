import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { CartModule } from './cart/cart.module'
import { ProductModule } from './product/product.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_MONGO),
    ProductModule,
    CartModule,
  ],
})
export class AppModule {}
