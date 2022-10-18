import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type ProductDocument = Product & Document

@Schema()
export class Product {
  @Prop()
  id: number

  @Prop({ required: true })
  title: string

  @Prop({ default: 'placeholder' })
  image?: string

  @Prop()
  likes?: string
}
export const ProductSchema = SchemaFactory.createForClass(Product)
