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

  async create(product): Promise<Product> {
    return new this.productModel(product).save()
  }

  async findOne(id: number): Promise<Product> {
    return this.productModel.findOne({ id })
  }

  async update(id: number, product): Promise<any> {
    await this.productModel.findOneAndUpdate({ id }, product)
  }
}
