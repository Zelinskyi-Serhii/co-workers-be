import { v4 as uuidv } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { Company } from './company.entity';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/create-company.dto';
import { Employee } from '../employee/employee.entity';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: typeof Company,
  ) {}
  getAllCompanies(userId: number) {
    return this.companyRepository.findAll({ where: { userId } });
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

  getCompanyById(companyId: number, userId: number) {
    return this.companyRepository.findOne({
      where: { id: companyId, userId: userId },
    });
  }

  createCompany(company: CreateCompanyDto, currentUserId: number) {
    return this.companyRepository.create({ ...company, userId: currentUserId });
  }

  updateCompany(company: UpdateCompanyDto, companyId: number) {
    return this.companyRepository.update(company, {
      where: { id: companyId },
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
