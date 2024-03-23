import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DismissEmployeeDto {
  @ApiProperty({ example: '12.12.2024' })
  @IsString()
  @IsNotEmpty()
  readonly dismissed: Date;
}
