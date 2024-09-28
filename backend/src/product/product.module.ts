import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { PaginationModule } from 'src/pagination/pagination.module';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { SubcategoryModule } from 'src/subcategory/subcategory.module';

@Module({
  controllers: [ProductController],
  imports: [PaginationModule, SubcategoryModule],
  providers: [ProductService, PrismaService, PaginationService],
})
export class ProductModule {}
