import { Inject, Injectable } from '@nestjs/common';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Review } from '../review/review.entity';
import { Op } from 'sequelize';

type WhereCondition = {
  [key: string]: {
    [Op.iLike]: string;
  };
}[];

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
        ['dismissed', 'DESC'],
        ['hireDate', 'DESC'],
      ],
    });
  }

  getEmployeeById(employeeId: number) {
    return this.employeeRepository.findOne({
      where: { id: employeeId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Review,
        },
      ],
    });
  }

  getEmployeesByFullname(fullname: string) {
    const [left, right] = fullname.split(' ');
  
    let whereConditionLeft: WhereCondition = [
      { firstname: { [Op.iLike]: `%${left}%` } },
    ];
    let whereConditionRight: WhereCondition = [
      { lastname: { [Op.iLike]: `%${left}%` } }
      ,
    ];
  
    if (right) {
      whereConditionLeft.push({ lastname: { [Op.iLike]: `%${right}%` } });
      whereConditionRight.push({ firstname: { [Op.iLike]: `%${right}%` } });
    }
  
    return this.employeeRepository.findAll({
      where: {
        [Op.or]: [
          whereConditionLeft,
          whereConditionRight,
        ],
      },
      limit: 20,
    });
  }

  createEmployee(dto: CreateEmployeeDto) {
    return this.employeeRepository.create(dto);
  }

  deleteEmployee(id: number) {
    return this.employeeRepository.destroy({ where: { id } });
  }

  dismissEmployee(employeeId: number, dismissDate: Date) {
    return this.employeeRepository.update(
      { dismissed: dismissDate },
      { where: { id: employeeId } },
    );
  }
}
