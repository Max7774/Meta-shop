import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';
import { PaymentStatusDto } from './dto/payment-status.dto';
import { ApiTags } from '@nestjs/swagger';
import { EnumOrderItemStatus, OrderItem } from '@prisma/client';
import { Response } from 'express';

@Controller('orders')
@ApiTags('Orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Auth(['DEFAULT_USER', 'ADMIN'])
  getAll(
    @CurrentUser('uuid') userUuid: string,
    @Query() params: { searchTerm: string; status?: EnumOrderItemStatus },
  ) {
    return this.orderService.getAll(userUuid, params);
  }

  @Get('by-user')
  @Auth(['DEFAULT_USER', 'ADMIN'])
  getByUserId(@CurrentUser('uuid') userUuid: string) {
    return this.orderService.getByUserId(userUuid);
  }

  @Get(':orderId')
  @Auth(['DEFAULT_USER', 'ADMIN'])
  getByUuid(
    @Param('orderId') orderId: string,
    @CurrentUser('uuid') userUuid: string,
  ) {
    return this.orderService.getOrderById(orderId, userUuid);
  }

  @Get('cancel/:orderUuid')
  @Auth(['DEFAULT_USER', 'ADMIN'])
  cancelOrder(@Param('orderUuid') orderUuid: string) {
    return this.orderService.cancelOrder(orderUuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('order-create')
  @Auth(['DEFAULT_USER', 'ADMIN'])
  placeOrder(@Body() dto: OrderDto, @CurrentUser('uuid') userUuid: string) {
    return this.orderService.placeOrder(dto, userUuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth(['ADMIN'])
  @Post('status')
  async updateStatus(@Body() dto: PaymentStatusDto) {
    return this.orderService.updateStatus(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth(['DEFAULT_USER', 'ADMIN'])
  @Get('receipt/:orderId')
  async uploadReceipt(
    @Param('orderId') orderId: string,
    @CurrentUser('uuid') userUuid: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const order = await this.orderService.getOrderById(orderId, userUuid);

      console.log(order);

      if (!order) {
        throw new HttpException('Order not found!', HttpStatus.NOT_FOUND);
      }
      res.sendFile(`receipt-${order.orderId}.pdf`, {
        root: process.env.DESTINATION_RECEIPTS,
      });
    } catch (error) {
      throw new HttpException('Order not found!', HttpStatus.NOT_FOUND);
    }
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth(['ADMIN'])
  @Put('actualize/:orderId')
  async actualizeOrder(
    @Param('orderId') orderId: string,
    @Body() dto: { items: OrderItem[] },
  ) {
    return this.orderService.actualizeOrder(dto.items, orderId);
  }
}
