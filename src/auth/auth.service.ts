import { Inject, Injectable } from '@nestjs/common';
import { Auth, IAuth } from './auth.entity';
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

  updateUser(userId: number, updateUserDto: Partial<IAuth>) {
    return this.authRepository.update(updateUserDto, {
      where: { id: userId },
    });
  }

  deleteUserByEmail(email: string) {
    return this.authRepository.destroy({
      where: { email },
      cascade: true,
    });
  }
}
