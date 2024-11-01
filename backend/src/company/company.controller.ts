import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { roles } from 'src/constants/roles';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

const { admin, company } = roles;

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth([admin])
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return await this.companyService.create(createCompanyDto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get()
  @Auth([admin, company])
  async getAllCompanies() {
    return await this.companyService.getAllCompanies();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':uuid/:userUuid')
  @Auth([admin])
  async deleteCompany(
    @Param('uuid') uuid: string,
    @Param('userUuid') userUuid: string,
  ) {
    return await this.companyService.deleteCompany(uuid, userUuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('products')
  @Auth([company])
  async getCompanyProducts(@CurrentUser('uuid') uuid: string) {
    return await this.companyService.getCompanyProducts(uuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('statistic')
  @Auth([company])
  async getCompanyStatistic(@CurrentUser('uuid') uuid: string) {
    return await this.companyService.getCompanyStatistic(uuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('info')
  @Auth([company])
  async getCompanyInfo(@CurrentUser('uuid') uuid: string) {
    return await this.companyService.getCompanyInfo(uuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth([company])
  async editCompanyInfo(
    @Body() dto: CreateCompanyDto,
    @CurrentUser('uuid') uuid: string,
  ) {
    return await this.companyService.editCompanyInfo(dto, uuid);
  }
}
