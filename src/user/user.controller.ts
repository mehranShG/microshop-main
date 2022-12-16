import { Body, Controller, Get, Param, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UpdateProfileDto } from '../dtos/update-profile.dto'
import { ResponseModel } from '../interface/response.model'
import { UserService } from './user.service'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile:id')
  async getUserProfile(@Param('id') id: number): Promise<ResponseModel> {
    return this.userService.getUserProfile(id)
  }

  @Put('profile:id')
  async updateProfile(
    @Param('id') id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<ResponseModel> {
    return this.userService.updateProfile(id, updateProfileDto)
  }
}
