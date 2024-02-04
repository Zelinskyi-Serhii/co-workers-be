import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CompanyService } from './company.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCompanyDto, CreateCompanyResponseDto } from './dto/create-company.dto';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post('create')
  @ApiResponse({ status: 201, type: CreateCompanyResponseDto})
  @UseGuards(AuthGuard)
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
}
