import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { promises as fs } from 'fs';

@Controller('subcategory')
@ApiTags('Subcategories')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth('ADMIN' || 'MANAGER')
  @Post()
  async create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return await this.subcategoryService.create(createSubcategoryDto);
  }

  @Get(':categoryUuid')
  async findAll(@Param('categoryUuid') categoryUuid: string) {
    return await this.subcategoryService.findAll(categoryUuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth('ADMIN' || 'MANAGER')
  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    try {
      const result = await this.subcategoryService.remove(uuid);
      const filePath = `${process.env.DESTINATION}/${result.icon}`;

      if (result) {
        await fs.unlink(filePath);
        return result;
      }
      return result;
    } catch (err) {
      throw new HttpException('Файл не найден', HttpStatus.NOT_FOUND);
    }
  }
}
