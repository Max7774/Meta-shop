import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from 'src/prisma.service';
import { QRCodeService } from 'src/qrcode/qrcode.service';
import { BotService } from 'src/bot/bot.service';
import { OrderDto } from './dto/order.dto';
import { PaymentStatusDto } from './dto/payment-status.dto';
import { EnumOrderItemStatus, EnumRoleOfUser } from '@prisma/client';
import { Response } from 'express';

function createMockOrder(overrides = {}): any {
  return {
    uuid: 'order-uuid',
    createdAt: new Date('2024-10-11T18:42:20.344Z'),
    updatedAt: new Date('2024-10-11T18:42:20.344Z'),
    orderId: 'ORDER123',
    comment: 'Test comment',
    total: 1000,
    status: EnumOrderItemStatus.Pending,
    isDelivery: true,
    isActual: true,
    addressUuid: 'address-uuid',
    userUuid: 'user-uuid',
    user: {
      uuid: 'user-uuid',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'test@example.com',
      phone_number: '1234567890',
      birth_day: '1990-01-01',
      first_name: 'John',
      second_name: 'Doe',
      password: 'hashedPassword',
      avatarPath: '',
      verified: true,
      verifyToken: '',
      role: EnumRoleOfUser.DEFAULT_USER,
      currentAddress: '',
    },
    address: {
      uuid: 'address-uuid',
      createdAt: new Date(),
      updatedAt: new Date(),
      userUuid: 'user-uuid',
      town: 'test-town',
      street: 'test-street',
      house: 'test-house',
      apartment: 'test-apartment',
      intercom: 'test-intercom',
      entrance: 'test-entrance',
      floor: 'test-floor',
    },
    items: [],
    ...overrides, // позволяет переопределять свойства при необходимости
  };
}

jest.mock('express', () => ({
  ...jest.requireActual('express'),
  Response: {
    sendFile: jest.fn(),
  },
}));

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            getAll: jest.fn(),
            getByUserId: jest.fn(),
            getOrderById: jest.fn(),
            cancelOrder: jest.fn(),
            placeOrder: jest.fn(),
            updateStatus: jest.fn(),
            actualizeOrder: jest.fn(),
            deleteOrder: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: QRCodeService,
          useValue: {},
        },
        {
          provide: BotService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should call OrderService.getAll with correct parameters', async () => {
      const userUuid = 'user-uuid';
      const params = {
        searchTerm: 'test',
        status: EnumOrderItemStatus.Pending,
      };
      const mockOrders = [createMockOrder()];
      jest.spyOn(service, 'getAll').mockResolvedValue(mockOrders);

      const result = await controller.getAll(userUuid, params);

      expect(result).toEqual(mockOrders);
      expect(service.getAll).toHaveBeenCalledWith(userUuid, params);
    });
  });

  describe('getByUserId', () => {
    it('should call OrderService.getByUserId with correct parameters', async () => {
      const userUuid = 'user-uuid';
      const mockOrders = [createMockOrder()];

      jest.spyOn(service, 'getByUserId').mockResolvedValue(mockOrders);

      const result = await controller.getByUserId(userUuid);

      expect(result).toEqual(mockOrders);
      expect(service.getByUserId).toHaveBeenCalledWith(userUuid);
    });
  });

  describe('getByUuid', () => {
    it('should call OrderService.getOrderById with correct parameters', async () => {
      const orderId = 'order-uuid';
      const userUuid = 'user-uuid';

      jest.spyOn(service, 'getOrderById').mockResolvedValue(createMockOrder());

      const result = await controller.getByUuid(orderId, userUuid);

      expect(result).toEqual(createMockOrder());
      expect(service.getOrderById).toHaveBeenCalledWith(orderId, userUuid);
    });
  });

  describe('cancelOrder', () => {
    it('should call OrderService.cancelOrder with correct parameters', async () => {
      const orderUuid = 'order-uuid';

      jest.spyOn(service, 'cancelOrder').mockResolvedValue(true);

      const result = await controller.cancelOrder(orderUuid);

      expect(result).toEqual(true);
      expect(service.cancelOrder).toHaveBeenCalledWith(orderUuid);
    });
  });

  describe('placeOrder', () => {
    it('should call OrderService.placeOrder with correct parameters', async () => {
      const userUuid = 'user-uuid';
      const dto: OrderDto = {
        uuid: 'order-uuid',
        items: [
          {
            uuid: 'item-uuid',
            productUuid: 'product-uuid',
            quantity: 1,
            price: 1000,
            inStock: true,
          },
        ],
        addressUuid: 'address-uuid',
        status: EnumOrderItemStatus.Pending,
        comment: 'Test comment',
        first_name: 'John',
      };

      const mockOrder = createMockOrder({ status: EnumOrderItemStatus.Payed });

      jest.spyOn(service, 'placeOrder').mockResolvedValue(mockOrder);

      const result = await controller.placeOrder(dto, userUuid);

      expect(result).toEqual(mockOrder);
      expect(service.placeOrder).toHaveBeenCalledWith(dto, userUuid);
    });
  });

  describe('updateStatus', () => {
    it('should call OrderService.updateStatus with correct parameters', async () => {
      const dto: PaymentStatusDto = {
        orderUuid: 'order-uuid',
        status: EnumOrderItemStatus.Payed,
      };
      const mockResponse = {
        uuid: 'order-uuid',
        status: EnumOrderItemStatus.Payed,
      };

      jest.spyOn(service, 'updateStatus').mockResolvedValue(mockResponse);

      const result = await controller.updateStatus(dto);

      expect(result).toEqual(mockResponse);
      expect(service.updateStatus).toHaveBeenCalledWith(dto);
    });
  });

  describe('uploadReceipt', () => {
    it('should call OrderService.getOrderById and send receipt file', async () => {
      const orderId = 'order-uuid';
      const userUuid = 'user-uuid';

      const res = { sendFile: jest.fn() } as unknown as Response;

      jest.spyOn(service, 'getOrderById').mockResolvedValue(createMockOrder());

      await controller.uploadReceipt(orderId, userUuid, res);

      expect(service.getOrderById).toHaveBeenCalledWith(orderId, userUuid);
      expect(res.sendFile).toHaveBeenCalledWith(
        `receipt-${createMockOrder().orderId}.pdf`,
        {
          root: process.env.DESTINATION_RECEIPTS,
        },
      );
    });
  });

  describe('actualizeOrder', () => {
    it('should call OrderService.actualizeOrder with correct parameters', async () => {
      const orderId = 'order-uuid';
      const dto = { items: [] };
      jest
        .spyOn(service, 'actualizeOrder')
        .mockResolvedValue(createMockOrder());

      const result = await controller.actualizeOrder(orderId, dto);

      expect(result).toEqual(createMockOrder());
      expect(service.actualizeOrder).toHaveBeenCalledWith(dto.items, orderId);
    });
  });

  describe('deleteOrder', () => {
    it('should call OrderService.deleteOrder with correct parameters', async () => {
      const orderId = 'order-uuid';

      jest.spyOn(service, 'deleteOrder').mockResolvedValue(createMockOrder());

      const result = await controller.deleteOrder(orderId);

      expect(result).toEqual(createMockOrder());
      expect(service.deleteOrder).toHaveBeenCalledWith(orderId);
    });
  });
});
