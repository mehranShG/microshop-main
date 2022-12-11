import { Matches } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateProfileDto {
  @ApiProperty({ default: null })
  first_name?: string

  @ApiProperty({ default: null })
  last_name?: string

  @ApiProperty({ default: null })
  @Matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/, {
    message: 'should be 11 characters and start with 09',
  })
  phone_number?: string

  @ApiProperty({ default: null })
  address?: string
}
