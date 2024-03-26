import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CompanyService } from './company.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateCompanyDto,
  CreateCompanyResponseDto,
  UpdateCompanyDto,
} from './dto/create-company.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@ApiTags('company')
@Controller('company')
@UseGuards(AuthGuard)
export class CompanyController {
  constructor(
    private companyService: CompanyService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Get('getAll')
  @ApiResponse({ status: 200, type: [CreateCompanyResponseDto] })
  async getAllCompanies(@Req() req: { currentUserId: number }) {
    const { currentUserId } = req;
    const companies = await this.companyService.getAllCompanies(currentUserId);

    return companies.map(company => ({
      id: company.id,
      name: company.name,
      avatarUrl: company.avatarUrl,
      ownedAt: company.ownedAt,
      ownerName: company.ownerName,
      publickId: company.publickId,
    }));
  }

  @Get('/:companyId')
  @ApiResponse({ status: 200, type: CreateCompanyResponseDto })
  async getCompanyById(
    @Param('companyId') companyId: number,
    @Req() req: { currentUserId: number },
  ) {
    const currentUserId = req.currentUserId;
    return this.companyService.getCompanyById(companyId, currentUserId);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('avatarUrl'))
  @ApiResponse({ status: 201, type: CreateCompanyResponseDto })
  async createCompany(
    @UploadedFile() avatarUrl,
    @Body() createCompanyDto: CreateCompanyDto,
    @Req() req: { currentUserId: number },
  ) {
    const currentUserId = req.currentUserId;
    const url = await this.cloudinaryService.uploadImage(avatarUrl);

    const createdCompany = await this.companyService.createCompany(
      { ...createCompanyDto, avatarUrl: url },
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

  @Put('update/:companyId')
  @UseInterceptors(FileInterceptor('avatarUrl'))
  @ApiResponse({ status: 200, description: 'Company updated successfully' })
  async updateCompany(
    @UploadedFile() avatarUrl,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    let url: string;

    if (avatarUrl) {
      url = await this.cloudinaryService.uploadImage(avatarUrl);
    }

    await this.companyService.updateCompany(
      { ...updateCompanyDto, avatarUrl: url },
      updateCompanyDto.id,
    );

    return { message: 'Company updated successfully' };
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

  @Get('generateId/:companyId')
  @ApiResponse({ status: 200, description: 'Publick id created syccessfully' })
  async generatePublickId(@Param('companyId') companyId: number) {
    const res = await this.companyService.generatePublickId(companyId);

    return { message: 'Publick id created syccessfully', data: res };
  }

  @Get('getAll/:publickId')
  @ApiResponse({ status: 200, type: [CreateCompanyResponseDto] })
  async getAllCompaniesByPublickId(@Param('publickId') publickId: string) {
    const companies =
      await this.companyService.getAllCompaniesbyPublickId(publickId);

    return companies.map(company => ({
      id: company.id,
      name: company.name,
      avatarUrl: company.avatarUrl,
      ownedAt: company.ownedAt,
      ownerName: company.ownerName,
      publickId: company.publickId,
    }));
  }
}
