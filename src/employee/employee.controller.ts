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
export class EmployeeController {
  constructor(
    private employeeService: EmployeeService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Get('getAll/:companyId')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, type: [CreateEmployeeResponseDto] })
  async getAllEmployees(@Param('companyId') companyId: number) {
    const employees = await this.employeeService.getAllEmployees(companyId);

    return employees;
  }

  @Get('getOne/:employeeId')
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, type: CreateEmployeeResponseDto })
  async getOneEmployee(@Param('employeeId') employeeId: number) {
    return this.employeeService.getEmployeeById(employeeId);
  }

  @Get('search/:fullname')
  @ApiResponse({ status: 200, type: [CreateEmployeeResponseDto] })
  async getOneEmployeeByFullname(@Param('fullname') fullname: string) {
    return this.employeeService.getEmployeesByFullname(fullname);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('avatarUrl'))
  @ApiResponse({ status: 200, type: CreateEmployeeResponseDto })
  async createEmployee(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @UploadedFile() avatarUrl,
  ) {
    const url = await this.cloudinaryService.uploadImage(avatarUrl);

    console.log(createEmployeeDto);

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
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Employee deleted successfully' })
  async deleteEmployee(@Param('employeeId') employeeId: number) {
    await this.employeeService.deleteEmployee(employeeId);

    return { message: 'Employee deleted successfully', id: employeeId };
  }
}
