import { Test, TestingModule } from '@nestjs/testing'
import { UpdateProfileDto } from '../dtos/update-profile.dto'
import { UserController } from './user.controller'
import { UserService } from './user.service'

const fakeUserService = {
  updateProfile: jest
    .fn()
    .mockResolvedValue({ succuss: true, result: 'updated' }),
  getUserProfile: jest
    .fn()
    .mockResolvedValue({ succuss: true, result: 'profile', code: 200 }),
}

describe('UserController', () => {
  let controller: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(fakeUserService)
      .compile()

    controller = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('getUserProfile', () => {
    it('should get user profile', async () => {
      expect(await controller.getUserProfile(1)).toEqual({
        succuss: true,
        result: 'profile',
        code: 200,
      })
    })
  })

  describe('updateProfile', () => {
    it('should update profile', async () => {
      const updateProfile = new UpdateProfileDto()
      updateProfile.first_name = 'alex'
      updateProfile.last_name = 'gold'
      updateProfile.address = 'test street'
      updateProfile.phone_number = '09111111111'
      expect(await controller.updateProfile(1, updateProfile)).toEqual({
        succuss: true,
        result: 'updated',
      })
    })
  })
})
