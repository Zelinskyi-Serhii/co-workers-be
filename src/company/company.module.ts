import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { AuthModule } from '../auth/auth.module';
import { companyProviders } from './company.provider';

@Module({
  imports: [AuthModule],
  controllers: [CompanyController],
  providers: [CompanyService, ...companyProviders]
})
export class CompanyModule {}
