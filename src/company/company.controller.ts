import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CompanyService } from './company.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateCompanyDto,
  CreateCompanyResponseDto,
} from './dto/create-company.dto';

@ApiTags('company')
@Controller('company')
@UseGuards(AuthGuard)
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get('getAll')
  @ApiResponse({ status: 200, type: [CreateCompanyResponseDto] })
  async getAllCompanies(@Req() req: { currentUserId: number }) {
    const {currentUserId} = req;
    const companies = await this.companyService.getAllCompanies(currentUserId);

    return companies.map(company => ({
      id: company.id,
      name: company.name,
      avatarUrl: company.avatarUrl,
      ownedAt: company.ownedAt,
      ownerName: company.ownerName,
    }));
  }

  @Post('create')
  @ApiResponse({ status: 201, type: CreateCompanyResponseDto })
  async createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
    @Req() req: { currentUserId: number },
  ) {
    const currentUserId = req.currentUserId;

    const createdCompany = await this.companyService.createCompany(
      createCompanyDto,
      currentUserId,
    );

    return {
      id: createdCompany.id,
      name: createdCompany.name,
      avatarUrl: createdCompany.avatarUrl,
      ownedAt: createdCompany.ownedAt,
      ownerName: createdCompany.ownerName,
    };
  }

  @Delete('delete/:id')
  @ApiResponse({ status: 200, description: 'Company deleted successfully' })
  async deleteCompany(
    @Param('id') id: number,
    @Req() req: { currentUserId: number },
  ) {
    const currentUserId = req.currentUserId;

    await this.companyService.deleteCompany(id, currentUserId);

    return { message: 'Company deleted successfully' };
  }
}
