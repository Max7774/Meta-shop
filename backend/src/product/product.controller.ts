import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetAllProductDto } from './dto/get-all.product.dto';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query() queryDto: GetAllProductDto) {
    return this.productService.getAll(queryDto);
  }

  @Get('similar/:uuid')
  async getSimilar(@Param('uuid') uuid: string) {
    return this.productService.getSimilar(uuid);
  }

  @Get('by-slug/:slug')
  async getProductBySlug(@Param('slug') slug: string) {
    return this.productService.bySlug(slug);
  }

  @Get('by-category/:categorySlug')
  async getProductsByCategory(@Param('categorySlug') categorySlug: string) {
    return this.productService.byCategory(categorySlug);
  }

  @HttpCode(200)
  @Get('recommendations')
  @Auth('DEFAULT_USER')
  async getRecommendedProducts(@CurrentUser('uuid') uuid: string) {
    return this.productService.recommendations(uuid);
  }

  @HttpCode(200)
  @Get('click/:productUuid')
  @Auth('DEFAULT_USER')
  async click(
    @Param('productUuid') productUuid: string,
    @CurrentUser('uuid') uuid: string,
  ) {
    return this.productService.click(uuid, productUuid);
  }

  @HttpCode(200)
  @Post('create')
  @Auth('ADMIN' || 'MANAGER')
  async createProduct(@Body() dto: ProductDto) {
    return this.productService.createProduct(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':uuid')
  @Auth('ADMIN' || 'MANAGER')
  async updateProduct(@Param('uuid') uuid: string, @Body() dto: ProductDto) {
    return this.productService.updateProduct(uuid, dto);
  }

  @HttpCode(200)
  @Delete(':uuid')
  @Auth('ADMIN')
  async deleteProduct(@Param('uuid') uuid: string) {
    return this.productService.deleteProduct(uuid);
  }

  @Get(':uuid')
  @Auth('ADMIN')
  async getProduct(@Param('uuid') uuid: string) {
    return this.productService.byId(uuid);
  }
}
