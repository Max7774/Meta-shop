import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Get,
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
  @Auth([admin])
  async getAllCompanies() {
    return await this.companyService.getAllCompanies();
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
}
