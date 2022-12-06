import { IsEmail, IsString, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty()
  @IsString()
  @MaxLength(20)
  username: string

  @ApiProperty()
  @IsString()
  @MaxLength(20)
  password: string

  @ApiProperty()
  @IsEmail()
  email: string
}
