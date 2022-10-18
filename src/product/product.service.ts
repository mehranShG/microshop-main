import { Model } from 'mongoose'
import { CreateDto, UpdateDto } from 'src/dtos/product.dto'
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

  async create(product: CreateDto): Promise<Product> {
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

  async update(id: number, product: UpdateDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(id)
        const result = await this.productModel.findOneAndUpdate(
          { id: id },
          product,
        )

        resolve(result)
      } catch (error) {
        console.log(error.message)
        reject(new HttpException('Something went wrong!', HttpStatus.CONFLICT))
      }
    })
  }

  async delete(id: number) {
    await this.productModel.deleteOne({ id })
  }
}
