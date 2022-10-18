import { Model } from 'mongoose'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Product, ProductDocument } from '../schemas/product.model'

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
    return new Promise(async (resolve, reject) => {
      try {
        const result = await new this.productModel(product).save()
        resolve(result)
      } catch (error) {
        console.log(error.message)
        reject(new HttpException('Something went wrong!', HttpStatus.CONFLICT))
      }
    })
  }

  async findOne(id: number): Promise<Product> {
    return this.productModel.findOne({ id })
  }

  async update(id: number, product): Promise<any> {
    await this.productModel.findOneAndUpdate({ id }, product)
  }

  async delete(id: number) {
    await this.productModel.deleteOne({ id })
  }
}
