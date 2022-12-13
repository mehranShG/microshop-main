import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'

@ApiTags('User')
@Controller('microservice/user')
export class UserMicroController {
  constructor(private readonly userService: UserService) {}
}
