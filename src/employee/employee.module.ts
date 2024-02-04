import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { employeeProviders } from './employee.provider';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, ...employeeProviders]
})
export class EmployeeModule {}
