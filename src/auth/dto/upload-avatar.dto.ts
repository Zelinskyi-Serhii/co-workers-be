import { ApiProperty } from '@nestjs/swagger';

export class UploadAvatarDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  readonly image: Buffer;
}

export class UploadAvatarResponseDto {
  @ApiProperty({ example: 'https://image.png'})
  readonly url: string;
}
