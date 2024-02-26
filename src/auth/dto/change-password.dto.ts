import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, max } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: '123456' })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password must not be empty' })
  readonly oldPassword: string;

  @ApiProperty({ example: '12345678' })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password must not be empty' })
  @Length(6, 16, { message: 'Password must be between 6 and 16 characters' })
  readonly newPassword: string;
}
