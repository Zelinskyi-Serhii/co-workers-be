import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateEmployeeResponseDto } from 'src/employee/dto/create-employee.dto';
import { ReviewDto } from 'src/review/dto/create-review.dto';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Viso' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'https://viso.ai/logo.png' })
  // todo: need to add validation
  readonly avatarUrl: string;

  @ApiProperty({ example: '2021-08-17T14:30:00.000Z' })
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

  @ApiProperty({ example: 'https://viso.ai/logo.png' })
  readonly avatarUrl: string;

  @ApiProperty({ example: '2021-08-17T14:30:00.000Z' })
  readonly ownedAt: string;

  @ApiProperty({ example: 'Serhii' })
  readonly ownerName: string;

  @ApiProperty({ example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' })
  readonly publicId: string | null;
}

export class PublicReviewDtoResponse {
  @ApiProperty({ example: 26 })
  readonly id: number;

  @ApiProperty({ example: 5 })
  readonly userId: number;

  @ApiProperty({ example: 'ATB' })
  readonly name: string;

  @ApiProperty({
    example:
      'https://res.cloudinary.com/dzuxudptr/image/upload/v1711398328/vua7nmszyaujfu9vl1mh.jpg',
  })
  readonly avatarUrl: string;

  @ApiProperty({ example: '1998-12-31T00:00:00.000Z' })
  readonly ownedAt: string;

  @ApiProperty({ example: 'Serhii' })
  readonly ownerName: string;

  @ApiProperty({ example: '511ccf86-30fc-4840-b232-e5e4b5ff4dd8' })
  readonly publicId: string;

  @ApiProperty({ example: '2024-03-21T09:54:17.341Z' })
  readonly createdAt: string;

  @ApiProperty({ example: '2024-04-02T18:03:24.265Z' })
  readonly updatedAt: string;

  @ApiProperty({ type: [CreateEmployeeResponseDto] })
  readonly employee: CreateEmployeeResponseDto[];

  @ApiProperty({ type: [ReviewDto] })
  readonly review: ReviewDto[];
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
