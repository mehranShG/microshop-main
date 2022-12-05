import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z\-]+$/, { message: 'username should Not have any digits' })
  username: string

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/(?=.*[A-Z])/, {
    message: 'password must contain atleast one capital letter',
  })
  password: string

  @ApiProperty()
  @IsEmail()
  email: string
}
