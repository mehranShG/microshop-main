import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type ProductDocument = Product & Document

@Schema()
export class Product {
  @Prop({ required: true, unique: true, type: Number })
  id: Number

  @Prop({ required: true, unique: true })
  title: string

  @Prop({ default: 'placeholder' })
  image?: string

  @Prop()
  likes?: number
}
export const ProductSchema = SchemaFactory.createForClass(Product)
