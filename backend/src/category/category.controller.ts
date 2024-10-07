import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('categories')
@ApiTags('Categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    return this.categoryService.getAll();
  }

  @Get('by-slug/:slug')
  async bySlug(@Param('slug') slug: string) {
    return this.categoryService.bySlug(slug);
  }

  @Get(':uuid')
  @Auth(['DEFAULT_USER'])
  async byId(@Param('uuid') uuid: string) {
    return this.categoryService.byId(uuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth(['ADMIN', 'MANAGER'])
  @Put(':uuid')
  async updateCategory(@Param('uuid') uuid: string, @Body() dto: CategoryDto) {
    return this.categoryService.updateCategory(uuid, dto);
  }

  @HttpCode(200)
  @Auth(['ADMIN', 'MANAGER'])
  @Post()
  async createCategory(@Body() dto: CategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @HttpCode(200)
  @Auth(['ADMIN', 'MANAGER'])
  @Delete(':uuid')
  async deleteCategory(@Param('uuid') uuid: string) {
    return this.categoryService.deleteCategory(uuid);
  }
}
