import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { roles } from 'src/constants/roles';

const { admin } = roles;

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async create(@Body() createClaimDto: CreateClaimDto) {
    return await this.claimsService.create(createClaimDto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth([admin])
  @Get()
  async findAll() {
    return await this.claimsService.findAll();
  }
}
