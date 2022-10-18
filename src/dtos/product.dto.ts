import { ApiProperty } from '@nestjs/swagger'

export class CreateDto {
  id?: number
  @ApiProperty()
  title: string
  @ApiProperty()
  image: string
  likes?: number
}
