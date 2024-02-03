import { Inject, Injectable } from '@nestjs/common';
import { Auth } from './auth.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_REPOSITORY')
    private authRepository: typeof Auth,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.authRepository.findOrCreate({
      where: { email: createUserDto.email },
      defaults: { ...createUserDto },
    });
  }

  getUserByEmail(email: string) {
    return this.authRepository.findOne({
      where: { email },
    });
  }

  checkIsAvailableNickname(nickname: string) {
    return this.authRepository.findOne({
      where: { nickname },
    });
  }
}
