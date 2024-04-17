import { v4 as uuidv } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { Company } from './company.entity';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/create-company.dto';
import { Employee } from '../employee/employee.entity';
import { Review } from '../review/review.entity';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: typeof Company,
  ) {}
  getAllCompanies(userId: number) {
    return this.companyRepository.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
  }

  getCompanybyPublickId(publicId: string) {
    return this.companyRepository.findOne({
      where: { publicId },
      include: [
        {
          model: Employee,
          attributes: { exclude: ['createdAt', 'updatedAt', 'companyId'] },
        },
      ],
      order: [
        [{ model: Employee, as: 'employee' }, 'dismissed', 'DESC'],
        [{ model: Employee, as: 'employee' }, 'hireDate', 'DESC'],
      ],
    });
  }

  getPublicReviews(companyId: string, employeeId: string) {
    return this.companyRepository.findOne({
      where: { publicId: companyId },
      include: [
        {
          model: Employee,
          attributes: { exclude: ['createdAt', 'updatedAt', 'companyId'] },
          where: { id: employeeId },

          include: [
            {
              model: Review,
            },
          ],
        },
      ],
    });
  }

  getCompanyByIdWithEmployees(companyId: number, userId: number) {
    return this.companyRepository.findOne({
      where: { id: companyId, userId },
      include: [
        {
          model: Employee,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      order: [
        [{ model: Employee, as: 'employee' }, 'hireDate', 'DESC'],
        [{ model: Employee, as: 'employee' }, 'dismissed', 'DESC'],
      ],
    });
  }

  createCompany(company: CreateCompanyDto, currentUserId: number) {
    return this.companyRepository.create({ ...company, userId: currentUserId });
  }

  updateCompany(company: UpdateCompanyDto, companyId: number, userId: number) {
    return this.companyRepository.update(company, {
      where: { id: companyId, userId },
    });
  }

  deleteCompany(id: number, userId: number) {
    return this.companyRepository.destroy({
      where: { id, userId },
      cascade: true,
    });
  }

  generatePublickId(companyId: number) {
    return this.companyRepository.update(
      { publicId: uuidv() },
      { where: { id: companyId } },
    );
  }
}
