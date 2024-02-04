import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Viso' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({example: 'https://viso.ai/logo.png'})
  @IsString()
  @IsNotEmpty()
  readonly avatarUrl: string;

  @ApiProperty({example: '2021-08-17T14:30:00.000Z'})
  @IsString()
  @IsNotEmpty()
  readonly ownedAt: string;

  @ApiProperty({ example: 'Serhii' })
  @IsString()
  @IsNotEmpty()
  readonly ownerName: string;
}
export class CreateCompanyResponseDto {
  @ApiProperty({ example: 1 })
  readonly id: number;

  @ApiProperty({ example: 'Viso' })
  readonly name: string;

  @ApiProperty({example: 'https://viso.ai/logo.png'})
  readonly avatarUrl: string;

  @ApiProperty({example: '2021-08-17T14:30:00.000Z'})
  readonly ownedAt: string;

  @ApiProperty({ example: 'Serhii' })
  readonly ownerName: string;
}
