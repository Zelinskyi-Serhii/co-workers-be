import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CheckNicknameDto {
  @ApiProperty({ example: 'fighter3000'})
  @IsString({ message: 'Nickname must be a string' })
  @IsNotEmpty()
  readonly nickname: string;
}
