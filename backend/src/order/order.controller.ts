import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';
import { PaymentStatusDto } from './dto/payment-status.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('Orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Auth('DEFAULT_USER')
  getAll(
    @CurrentUser('uuid') userUuid: string,
    @Query() params: { searchTerm: string },
  ) {
    return this.orderService.getAll(userUuid, params);
  }

  @Get('by-user')
  @Auth('DEFAULT_USER')
  getByUserId(@CurrentUser('uuid') userUuid: string) {
    return this.orderService.getByUserId(userUuid);
  }

  @Get('cancel/:orderUuid')
  @Auth('DEFAULT_USER' || 'ADMIN')
  cancelOrder(@Param('orderUuid') orderUuid: string) {
    return this.orderService.cancelOrder(orderUuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('order-create')
  @Auth('DEFAULT_USER')
  placeOrder(@Body() dto: OrderDto, @CurrentUser('uuid') userUuid: string) {
    return this.orderService.placeOrder(dto, userUuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth('ADMIN')
  @Post('status')
  async updateStatus(@Body() dto: PaymentStatusDto) {
    return this.orderService.updateStatus(dto);
  }
}
