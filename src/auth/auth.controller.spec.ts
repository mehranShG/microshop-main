import { Test, TestingModule } from '@nestjs/testing'
import { RegisterDto } from '../dtos/register.dto'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

const fakeService = {
  register: jest
    .fn()
    .mockResolvedValue({ success: true, result: {}, code: 201 }),
}

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(fakeService)
      .compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('Register', () => {
    it('should register user', async () => {
      const register = new RegisterDto()
      register.email = 'test@a.com'
      register.password = 'testingA'
      register.username = 'testing'
      expect(await controller.Register(register)).toEqual({
        code: 201,
        result: {},
        success: true,
      })
    })
  })
})
