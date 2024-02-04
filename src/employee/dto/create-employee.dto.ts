import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  readonly companyId: number;

  @ApiProperty({ example: 'Serhii' })
  @IsString()
  @IsNotEmpty()
  readonly firstname: string;

  @ApiProperty({ example: 'Zel' })
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @ApiProperty({ example: 'Fullstack developer' })
  @IsString()
  @IsNotEmpty()
  readonly position: string;

  @ApiProperty({ example: '2021-08-17T14:30:00.000Z' })
  @IsString()
  @IsNotEmpty()
  readonly hireDate: string;

  @ApiProperty({ example: 'https://image.png' })
  @IsString()
  @IsNotEmpty()
  readonly avatarUrl: string;

  @ApiProperty({ example: '1998-08-17T14:30:00.000Z' })
  @IsString()
  @IsNotEmpty()
  readonly birthday: string;
}

export class CreateEmployeeResponseDto {
  @ApiProperty({ example: 1 })
  readonly id: number;

  @ApiProperty({ example: 'Serhii' })
  readonly firstname: string;

  @ApiProperty({ example: 'Zel' })
  readonly lastname: string;

  @ApiProperty({ example: 'Fullstack developer' })
  readonly position: string;

  @ApiProperty({ example: '2021-08-17T14:30:00.000Z' })
  readonly hireDate: string;

  @ApiProperty({ example: 'https://image.png' })
  readonly avatarUrl: string;

  @ApiProperty({ example: '1998-08-17T14:30:00.000Z' })
  readonly birthday: string;

  @ApiProperty({ example: false })
  readonly isDismissed: boolean;
}
