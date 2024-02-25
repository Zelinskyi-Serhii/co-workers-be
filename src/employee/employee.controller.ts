import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import {
  CreateEmployeeDto,
  CreateEmployeeResponseDto,
} from './dto/create-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('employee')
@ApiTags('employee')
@UseGuards(AuthGuard)
export class EmployeeController {
  constructor(
    private employeeService: EmployeeService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Get('getAll/:companyId')
  @ApiResponse({ status: 200, type: [CreateEmployeeResponseDto] })
  async getAllEmployees(@Param('companyId') companyId: number) {
    const employees = await this.employeeService.getAllEmployees(companyId);

    return employees;
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('avatarUrl'))
  @ApiResponse({ status: 200, type: CreateEmployeeResponseDto })
  async createEmployee(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @UploadedFile() avatarUrl,
  ) {
    const url = await this.cloudinaryService.uploadImage(avatarUrl);

    const employee = await this.employeeService.createEmployee({
      ...createEmployeeDto,
      companyId: Number(createEmployeeDto.companyId),
      avatarUrl: url,
    });

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
