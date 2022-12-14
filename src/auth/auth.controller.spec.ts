import { Test, TestingModule } from '@nestjs/testing'
import { LoginDto } from '../dtos/login.dto'
import { RegisterDto } from '../dtos/register.dto'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

const fakeService = {
  register: jest
    .fn()
    .mockResolvedValue({ success: true, result: {}, code: 201 }),

  login: jest.fn().mockResolvedValue({ success: true, result: {}, code: 200 }),

  findById: jest
    .fn()
    .mockResolvedValue({ success: true, result: 'user', code: 200 }),
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

  describe('Login', () => {
    it('should login', async () => {
      const login = new LoginDto()
      login.email = 'test@a.com'
      login.password = 'testingA'
      expect(await controller.login(login)).toEqual({
        code: 200,
        result: {},
        success: true,
      })
    })
  })

  describe('getUserByID', () => {
    it('should get a user by id', async () => {
      expect(await controller.getUserByID(1)).toEqual({
        success: true,
        result: 'user',
        code: 200,
      })
    })
  })
})
