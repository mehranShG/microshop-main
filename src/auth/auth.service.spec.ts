import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { LoginDto } from '../dtos/login.dto'
import { AuthEntity } from '../entities/auth.entity'
import { AuthService } from './auth.service'

const fakeAuthEntity = {
  findOne: jest.fn().mockResolvedValue({
    id: 5,
    email: 'test@a.com',
    authPass: {
      password: '$2a$10$B7hRu976Yuy1M76Qt2aH7O9nVZRM3PqlaV4t.M9ndAeGn9l3./jzi',
    },
  }),
}

const fakeJwt = {
  signAsync: jest.fn().mockResolvedValue('token'),
}

describe('AuthService', () => {
  let service: AuthService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,

        { provide: getRepositoryToken(AuthEntity), useValue: fakeAuthEntity },
        { provide: JwtService, useValue: fakeJwt },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Login', () => {
    it('should login', async () => {
      const loginDto = new LoginDto()
      loginDto.email = 'test@a.com'
      loginDto.password = 'testingA'
      expect(await service.login(loginDto)).toEqual({
        code: 200,
        result: { id: 5, token: 'token' },
        success: true,
      })
    })
  })
})
