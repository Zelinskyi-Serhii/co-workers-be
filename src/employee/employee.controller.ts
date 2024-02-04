import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateEmployeeDto,
  CreateEmployeeResponseDto,
} from './dto/create-employee.dto';
import { plainToClass } from 'class-transformer';

@Controller('employee')
@ApiTags('employee')
@UseGuards(AuthGuard)
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get('getAll/:companyId')
  @ApiResponse({ status: 200, type: [CreateEmployeeResponseDto] })
  async getAllEmployees(@Param('companyId') companyId: number) {
    const employees = await this.employeeService.getAllEmployees(companyId);

    return employees;
  }

  @Post('create')
  @ApiResponse({ status: 200, type: CreateEmployeeResponseDto })
  async createEmployee(@Body() dto: CreateEmployeeDto) {
    const employee = await this.employeeService.createEmployee(dto);

    return {
      id: employee.id,
      firstname: employee.firstname,
      lastname: employee.lastname,
      position: employee.position,
      hireDate: employee.hireDate,
      avatarUrl: employee.avatarUrl,
      birthday: employee.birthday,
      isDismissed: employee.isDismissed,
    };
  }
}
