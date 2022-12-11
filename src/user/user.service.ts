import { AuthEntity } from 'src/entities/auth.entity'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly AuthRepository: Repository<AuthEntity>,
  ) {}
}
