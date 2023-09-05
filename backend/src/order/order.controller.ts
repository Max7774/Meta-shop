import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';
import { PaymentStatusDto } from './dto/payment-status.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Auth('DEFAULT_USER')
  getAll(@CurrentUser('uuid') userUuid: string) {
    return this.orderService.getAll(userUuid);
  }

  @Get('by-user')
  @Auth('DEFAULT_USER')
  getByUserId(@CurrentUser('uuid') userUuid: string) {
    return this.orderService.getByUserId(userUuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth('DEFAULT_USER')
  placeOrder(@Body() dto: OrderDto, @CurrentUser('uuid') userUuid: string) {
    return this.orderService.placeOrder(dto, userUuid);
  }

  @HttpCode(200)
  @Post('status')
  async updateStatus(@Body() dto: PaymentStatusDto) {
    return this.orderService.updateStatus(dto);
  }
}
