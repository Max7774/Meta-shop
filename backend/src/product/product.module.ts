import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { CategoryModule } from 'src/category/category.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma.service';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  controllers: [ProductController],
  imports: [PaginationModule, CategoryModule],
  providers: [ProductService, PrismaService, PaginationService],
})
export class ProductModule {}
