import { Model } from 'mongoose'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { UpdateDto } from '../dtos/product.dto'
import { Product, ProductDocument } from '../schemas/product.model'

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  /**
   * Get all Products
   * @returns product
   */
  async getAll(): Promise<Product[]> {
    return this.productModel.find().exec()
  }

  /**
   * Save a product
   * @param product
   * @returns product
   */
  async addProduct(product: Product): Promise<Product> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await new this.productModel(product).save()
        resolve(result)
      } catch (err) {
        reject(new HttpException('Something went wrong!', HttpStatus.CONFLICT)),
          console.log(err.message)
      }
    })
  }

  /**
   * Find a PRODUCT
   * @param id
   * @returns product
   */
  async findOne(id: number): Promise<Product> {
    return this.productModel.findOne({ id })
  }

  /**
   * Update a product
   * @param id
   * @param product
   * @returns
   */
  async update(id: number, product: UpdateDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
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

  /**
   * Delete a product
   * @param id
   * @returns
   */
  async delete(id: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const findProduct = await this.productModel.findOne({ id })
        if (findProduct == null) {
          reject(
            new HttpException('Something went wrong!', HttpStatus.CONFLICT),
          )
        }
        const result = await this.productModel.deleteOne({ id })
        resolve(result)
      } catch (error) {
        console.log(error.message)
        reject(new HttpException('Something went wrong!', HttpStatus.CONFLICT))
      }
    })
  }
}
