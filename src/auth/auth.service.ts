import { from, Observable } from 'rxjs'
import { AuthEntity } from 'src/entities/auth.entity'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
  ) {}

  register(authEntity: AuthEntity): Observable<AuthEntity> {
    return from(this.authRepository.save(authEntity))
  }

  login(loginDto) {
    return from(
      this.authRepository.findOne({
        where: { username: loginDto, email: loginDto },
      }),
    )
  }
}
