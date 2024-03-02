import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReviewDto {
  @ApiProperty({ example: 128 })
  readonly id: number;

  @ApiProperty({ example: 1 })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Id must be integer' },
  )
  readonly employeeId: number;

  @ApiProperty({ example: 'This is a goob boy' })
  @IsString({ message: 'Review must be a string' })
  @IsNotEmpty({ message: 'Review couldn`t  be empty' })
  readonly review: string;
}

export class CreateReviewDto extends OmitType(ReviewDto, ['id']) {}
