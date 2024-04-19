import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authProviders } from './auth.provider';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';

@Module({
  imports: [
    DatabaseModule,
    CloudinaryModule,
    NodemailerModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...authProviders],
  exports: [AuthService],
})
export class AuthModule {}
