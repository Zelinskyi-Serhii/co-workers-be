import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CompanyModule } from './company/company.module';
import { EmployeeModule } from './employee/employee.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    DatabaseModule,
    AuthModule,
    CloudinaryModule,
    CompanyModule,
    EmployeeModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
