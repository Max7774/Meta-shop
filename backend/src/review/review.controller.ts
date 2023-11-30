import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ReviewDto } from './dto/review.dto';
import { ReviewService } from './review.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('reviews')
@ApiTags('Review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll() {
    return this.reviewService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('leave/:productUuid')
  async leaveReview(
    @CurrentUser('uuid') uuid: string,
    @Body() dto: ReviewDto,
    @Param('productUuid') productUuid: string,
  ) {
    return this.reviewService.createReview(uuid, dto, productUuid);
  }

  @Get('avarage-by-product/:productUuid')
  async getAvarage(@Param('productUuid') productUuid: string) {
    return this.reviewService.getAverageValueByProductId(productUuid);
  }
}
