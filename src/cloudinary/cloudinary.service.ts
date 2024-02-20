import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

@Injectable()
export class CloudinaryService {
  constructor() {
    v2.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  async uploadImage(
    file: any,
  ): Promise<string> {
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      v2.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(file.buffer);
    });

    return result.secure_url;
  }
}
