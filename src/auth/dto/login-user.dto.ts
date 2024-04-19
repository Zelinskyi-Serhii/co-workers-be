import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, Length } from 'class-validator';

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

  @ApiProperty({ example: 'https://example.com' })
  readonly avatarUrl: string;
}

export class GetUserInfo {
  @ApiProperty({ example: 'email@example.com' })
  readonly email: string;

  @ApiProperty({ example: 'John' })
  readonly nickname: string;

  @ApiProperty({ example: 'https://example.com' })
  readonly avatarUrl: string;
}

export class ResetPassword {
  @ApiProperty({ example: 'email@example.com' })
  @IsEmail({}, { message: 'Invalid email format' })
  readonly email: string;
}

export class VarifyResetCode {
  @ApiProperty({ example: 'email@example.com' })
  @IsEmail({}, { message: 'Invalid email format' })
  readonly email: string;

  @ApiProperty({ example: 'email@example.com' })
  @IsNumber({}, { message: 'Invalid code format' })
  readonly code: number;
}
