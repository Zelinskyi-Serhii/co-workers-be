import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { AuthModule } from '../auth/auth.module';
import { companyProviders } from './company.provider';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [AuthModule, CloudinaryModule],
  controllers: [CompanyController],
  providers: [CompanyService, ...companyProviders]
})
export class CompanyModule {}
