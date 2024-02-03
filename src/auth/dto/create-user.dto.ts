import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsEmail({}, { message: 'Invalid email format' })
  readonly email: string;

  @ApiProperty({ example: '123456' })
  @IsString({ message: 'Invalid password format' })
  @Length(6, 16, { message: 'Password must be between 6 and 16 characters' })
  readonly password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString({ message: 'Invalid name format' })
  readonly nickname: string;
}
