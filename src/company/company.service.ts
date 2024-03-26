import { v4 as uuidv } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { Company } from './company.entity';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: typeof Company,
  ) {}
  getAllCompanies(userId: number) {
    return this.companyRepository.findAll({ where: { userId } });
  }

  getAllCompaniesbyPublickId(publickId: string) {
    return this.companyRepository.findAll({ where: { publickId } });
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
      { publickId: uuidv() },
      { where: { id: companyId } },
    );
  }
}
