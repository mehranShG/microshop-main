import { ResponseModel } from 'src/interface/response.model'
import { Controller, Get, Put } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'

@ApiTags('User')
@Controller('microservice/user')
export class UserMicroController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @MessagePattern({ name: 'get_user_profile' })
  async getUserProfile(id: number): Promise<ResponseModel> {
    return this.userService.getUserProfile(id)
  }

  @Put('update')
  @MessagePattern({ name: 'update_user_profile' })
  async updateProfile(payload: any): Promise<ResponseModel> {
    return this.userService.updateProfile(payload.id, payload.updateProfileDto)
  }
}
