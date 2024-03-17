import { Inject, Injectable } from '@nestjs/common';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: typeof Company,
  ) {}
  getAllCompanies(userId: number) {
    return this.companyRepository.findAll({ where: { userId } });
  }

  getCompanyById(companyId: number, userId: number) {
    return this.companyRepository.findOne({
      where: { id: companyId, userId: userId },
    });
  }

  createCompany(company: CreateCompanyDto, currentUserId: number) {
    return this.companyRepository.create({ ...company, userId: currentUserId });
  }

  deleteCompany(id: number, userId: number) {
    return this.companyRepository.destroy({
      where: { id, userId },
      cascade: true,
    });
  }
}
