import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UpdateProfileDto } from '../dtos/update-profile.dto'
import { AuthEntity } from '../entities/auth.entity'
import { UserService } from './user.service'

const MockAuthModel = {
  findOne: jest.fn().mockResolvedValue({
    id: 1,
    first_name: 'alex',
    last_name: 'gold',
    address: 'test street',
    phone_number: '0911111111',
  }),
  save: jest.fn().mockResolvedValue('updated'),
}
describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(AuthEntity), useValue: MockAuthModel },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getUserProfile', () => {
    it('should get user profile', async () => {
      expect(await service.getUserProfile(1)).toEqual({
        success: true,
        result: {
          address: 'test street',
          first_name: 'alex',
          id: 1,
          last_name: 'gold',
          phone_number: '0911111111',
          profile_image: undefined,
        },
        code: 200,
      })
    })
  })

  describe('updateProfile', () => {
    it('should get user profile', async () => {
      const updateProfile = new UpdateProfileDto()
      updateProfile.first_name = 'alex'
      updateProfile.last_name = 'gold'
      updateProfile.address = 'test street'
      updateProfile.phone_number = '09111111111'
      expect(await service.updateProfile(1, updateProfile)).toEqual({
        success: true,
        result: 'updated',
        code: 200,
      })
    })
  })
})
