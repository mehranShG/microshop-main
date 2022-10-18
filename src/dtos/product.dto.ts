import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateDto {
  @ApiProperty()
  id: number

  @IsString()
  @ApiProperty()
  title: string

  @IsString()
  @ApiProperty()
  image: string

  likes?: number
}

export class UpdateDto {
  @IsString()
  @ApiProperty()
  title: string

  @IsString()
  @ApiProperty()
  image: string

  likes?: number
}
