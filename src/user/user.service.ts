import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UpdateProfileDto } from '../dtos/update-profile.dto'
import { AuthEntity } from '../entities/auth.entity'
import { ResponseModel } from '../interface/response.model'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
  ) {}

  async getUserProfile(id: number): Promise<ResponseModel> {
    const findUser = await this.authRepository.findOne({ where: { id: id } })
    if (!findUser) {
      return {
        success: true,
        result: 'Not found!',
        code: 404,
      }
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

  async updateProfile(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<ResponseModel> {
    const finduser = await this.authRepository.findOne({ where: { id: id } })
    if (!finduser) {
      return {
        success: true,
        result: 'Not found!',
        code: 404,
      }
    }
    finduser.first_name = updateProfileDto.first_name
    finduser.last_name = updateProfileDto.last_name
    finduser.address = updateProfileDto.address
    finduser.phone_number = updateProfileDto.phone_number
    const updateProfile = await this.authRepository.save(finduser)
    return {
      success: true,
      result: updateProfile,
      code: 200,
    }
  }
}
