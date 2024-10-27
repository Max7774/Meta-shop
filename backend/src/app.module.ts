import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { PaginationModule } from './pagination/pagination.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { OrderModule } from './order/order.module';
import { StatisticsModule } from './statistics/statistics.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    ProductModule,
    CategoryModule,
    PaginationModule,
    FileUploadModule,
    OrderModule,
    StatisticsModule,
    UserModule,
    AddressModule,
    SubcategoryModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
