import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CheckNicknameDto {
  @ApiProperty({ example: 'fighter3000'})
  @IsString({ message: 'Nickname must be a string' })
  readonly nickname: string;
}
