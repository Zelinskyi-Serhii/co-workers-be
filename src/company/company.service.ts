import { Inject, Injectable } from '@nestjs/common';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: typeof Company,
  ) {}
  createCompany(company: CreateCompanyDto, currentUserId: number) {
    return this.companyRepository.create({ ...company, userId: currentUserId });
  }
}
