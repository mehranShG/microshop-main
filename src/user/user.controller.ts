import { ResponseModel } from 'src/interface/response.model'
import { Controller, Get, Param } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile:id')
  async getUserProfile(@Param('id') id: number): Promise<ResponseModel> {
    return this.userService.getUserProfile(id)
  }
}
