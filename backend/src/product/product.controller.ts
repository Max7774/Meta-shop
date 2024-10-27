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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { returnProductSchema } from './return-product.object';
import { roles } from 'src/constants/roles';

const { user, company, admin } = roles;

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get()
  @ApiResponse({
    schema: {
      type: 'object',
      properties: {
        length: {
          type: 'number',
          example: 0,
        },
        products: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/returnProductSchema',
          },
          example: [returnProductSchema],
        },
      },
    },
  })
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

  @Get('by-subcategory/:subcategorySlug')
  async getProductsByCategory(
    @Param('subcategorySlug') subcategorySlug: string,
  ) {
    return this.productService.bySubcategory(subcategorySlug);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('recommendations')
  @Auth([user])
  async getRecommendedProducts(@CurrentUser('uuid') uuid: string) {
    return this.productService.recommendations(uuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('click/:productUuid')
  @Auth([user])
  async click(
    @Param('productUuid') productUuid: string,
    @CurrentUser('uuid') uuid: string,
  ) {
    return this.productService.click(uuid, productUuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('create')
  @Auth([admin, company])
  async createProduct(
    @Body() dto: ProductDto,
    @CurrentUser('uuid') uuid: string,
  ) {
    return this.productService.createProduct(dto, uuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':uuid')
  @Auth([admin, company])
  async updateProduct(@Param('uuid') uuid: string, @Body() dto: ProductDto) {
    return this.productService.updateProduct(uuid, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':uuid')
  @Auth([admin, company])
  async deleteProduct(@Param('uuid') uuid: string) {
    return this.productService.deleteProduct(uuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(':uuid')
  @Auth([admin, company])
  async getProduct(@Param('uuid') uuid: string) {
    return this.productService.byId(uuid);
  }
}
