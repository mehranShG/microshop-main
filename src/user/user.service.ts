import { UpdateProfileDto } from 'src/dtos/update-profile.dto'
import { AuthEntity } from 'src/entities/auth.entity'
import { ResponseModel } from 'src/interface/response.model'
import { Repository } from 'typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
  ) {}

  async getUserProfile(id: number): Promise<ResponseModel> {
    const findUser = await this.authRepository.findOne({ where: { id: id } })
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

  async updateProfile(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<ResponseModel> {
    const finduser = await this.authRepository.findOne({ where: { id: id } })
    if (!finduser) {
      throw new NotFoundException()
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
