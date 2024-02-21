import { Inject, Injectable } from '@nestjs/common';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_REPOSITORY')
    private employeeRepository: typeof Employee,
  ) {}

  getAllEmployees(companyId: number) {
    return this.employeeRepository.findAll({
      where: { companyId },
      attributes: { exclude: ['companyId', 'createdAt', 'updatedAt'] },
      order: [
        ['id', 'ASC'],
    ],
    });
  }

  createEmployee(dto: CreateEmployeeDto) {
    return this.employeeRepository.create(dto);
  }
}
