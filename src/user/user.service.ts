import { AuthEntity } from 'src/entities/auth.entity'
import { ResponseModel } from 'src/interface/response.model'
import { Repository } from 'typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly AuthRepository: Repository<AuthEntity>,
  ) {}

  async getUserProfile(id: number): Promise<ResponseModel> {
    const findUser = await this.AuthRepository.findOne({ where: { id: id } })
    if (!findUser) {
      throw new NotFoundException()
    }
    const profile = {
      id: findUser.id,
      first_name: findUser.first_name,
      last_name: findUser.last_name,
      phone_number: findUser.phone_number,
      address: findUser.address,
      profile_image: findUser.profile_image,
    }
    return {
      success: true,
      result: profile,
      code: 200,
    }
  }

  async updateProfile(updateProfileDto) {
    const finduser = await this.AuthRepository.findOne({ where: { id: 1 } })
  }
}
