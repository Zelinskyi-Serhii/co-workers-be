import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
import { DismissEmployeeDto } from './dto/update-employee.dto';

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

  @Get('getOne/:employeeId')
  @ApiResponse({ status: 200, type: CreateEmployeeResponseDto })
  async getOneEmployee(@Param('employeeId') employeeId: number) {
    return this.employeeService.getEmployeeById(employeeId);
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
      dismissed: employee.dismissed,
    };
  }

  @Put('dismiss/:employeeId')
  @ApiResponse({ status: 200, description: 'Employee updated successfully' })
  async dismissEmployee(
    @Param('employeeId') employeeId: number,
    @Body() updateEmployeeDto: DismissEmployeeDto,
  ) {
    await this.employeeService.dismissEmployee(
      employeeId,
      updateEmployeeDto.dismissed,
    );

    return { message: 'Employee updated successfully' };
  }

  @Delete('delete/:employeeId')
  @ApiResponse({ status: 200, description: 'Employee deleted successfully' })
  async deleteEmployee(@Param('employeeId') employeeId: number) {
    await this.employeeService.deleteEmployee(employeeId);

    return { message: 'Employee deleted successfully', id: employeeId };
  }
}
