import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SubcategoryController],
  providers: [SubcategoryService, PrismaService],
  exports: [SubcategoryService],
})
export class SubcategoryModule {}
