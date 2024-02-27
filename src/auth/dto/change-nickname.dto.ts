import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeNicknameDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;
}
