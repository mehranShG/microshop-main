import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Product, ProductDocument } from './product.model'

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productModel.find().exec()
  }

  async create(data): Promise<Product> {
    return new this.productModel(data).save()
  }
}
