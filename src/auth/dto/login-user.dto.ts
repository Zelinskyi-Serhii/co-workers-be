import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'John' })
  @IsEmail({}, { message: 'Invalid email format' })
  readonly email: string;

  @ApiProperty({ example: '123456' })
  @IsString({ message: 'Invalid password format' })
  @Length(6, 16, { message: 'Password must be between 6 and 16 characters' })
  readonly password: string;
}

export class LoginUserResponceDto {
  @ApiProperty({ example: 'lerkgoijerigeukriog' })
  readonly accessToken: string;

  @ApiProperty({ example: 'email@example.com' })
  readonly email: string;

  @ApiProperty({ example: 'John' })
  readonly nickname: string;
}
