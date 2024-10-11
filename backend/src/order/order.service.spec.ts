import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { PrismaService } from 'src/prisma.service';
import { QRCodeService } from 'src/qrcode/qrcode.service';
import { BotService } from 'src/bot/bot.service';
import { OrderDto } from './dto/order.dto';
import { BadGatewayException, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentStatusDto } from './dto/payment-status.dto';
import { mockOrder } from 'src/bot/bot.service.spec';
import { EnumOrderItemStatus, EnumRoleOfUser } from '@prisma/client';
import { Message } from 'node-telegram-bot-api';
import * as QRCode from 'qrcode';
import * as path from 'path';
import * as fs from 'fs';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn().mockResolvedValue(true),
  })),
}));

describe('OrderService', () => {
  let service: OrderService;
  let prisma: PrismaService;
  let qrCodeService: QRCodeService;
  let botService: BotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: PrismaService,
          useValue: {
            order: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
            user: {
              findUnique: jest.fn(),
            },
            orderItem: {
              update: jest.fn(),
              findMany: jest.fn(),
              deleteMany: jest.fn(),
            },
            product: {
              findUnique: jest.fn(),
            },
            $transaction: jest.fn((fn) => fn(prisma)),
          },
        },
        {
          provide: QRCodeService,
          useValue: {
            generateQRCode: jest.fn(async (data: string) => {
              // Генерируем корректные данные Base64 для QR-кода с использованием библиотеки qrcode
              return await QRCode.toDataURL(data);
            }),
          },
        },
        {
          provide: BotService,
          useValue: {
            sendOrderNotification: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    prisma = module.get<PrismaService>(PrismaService);
    qrCodeService = module.get<QRCodeService>(QRCodeService);
    botService = module.get<BotService>(BotService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterAll(() => {
    const receiptsPath = path.join(process.cwd(), 'src', 'receipts');

    if (fs.existsSync(receiptsPath)) {
      const files = fs.readdirSync(receiptsPath);
      for (const file of files) {
        fs.unlinkSync(path.join(receiptsPath, file));
      }
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('placeOrder', () => {
    it('should place an order successfully', async () => {
      const mockOrderDto: OrderDto = {
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
      const mockUserUuid = 'user-uuid';

      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue({
        name: 'Test Product',
        quantity: 100,
        price: 1000,
        inStock: true,
        uuid: 'product-uuid',
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: 'test-product',
        description: 'Test description',
        peculiarities: 'None',
        discount: 0,
        images: [],
        unitofmeasurement: 'pcs',
        userUuid: 'user-uuid',
        subcategoryUuid: 'subcategory-uuid',
      });

      const qrData = `${process.env.FRONTEND_URL}/order/${mockOrderDto.uuid}`;

      jest.spyOn(prisma.order, 'create').mockResolvedValue(mockOrder);
      jest
        .spyOn(botService, 'sendOrderNotification')
        .mockResolvedValue(Promise.resolve({} as Message));
      jest
        .spyOn(qrCodeService, 'generateQRCode')
        .mockResolvedValue(await QRCode.toDataURL(qrData));

      const result = await service.placeOrder(mockOrderDto, mockUserUuid);

      expect(result).toEqual(mockOrder);
      expect(prisma.order.create).toHaveBeenCalled();
      expect(botService.sendOrderNotification).toHaveBeenCalledWith(mockOrder);
    });

    it('should throw BadGatewayException if some items are not in stock', async () => {
      const mockOrderDto: OrderDto = {
        uuid: 'order-uuid',
        items: [
          {
            uuid: 'item-uuid',
            productUuid: 'product-uuid',
            quantity: 1,
            price: 1000,
            inStock: false,
          },
        ],
        addressUuid: 'address-uuid',
        status: 'Pending',
        comment: 'Test comment',
        first_name: 'John',
      };
      const mockUserUuid = 'user-uuid';

      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue({
        name: 'Test Product',
        quantity: 100,
        price: 1000,
        inStock: false,
        uuid: 'product-uuid',
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: 'test-product',
        description: 'Test description',
        peculiarities: 'None',
        discount: 0,
        images: [],
        unitofmeasurement: 'pcs',
        userUuid: 'user-uuid',
        subcategoryUuid: 'subcategory-uuid',
      });

      await expect(
        service.placeOrder(mockOrderDto, mockUserUuid),
      ).rejects.toThrow(BadGatewayException);
    });
  });

  describe('getOrderById', () => {
    it('should return an order for a given ID', async () => {
      const mockOrderId = 'ORDER123';
      const mockUserUuid = 'user-uuid';
      const mockOrder = {
        orderId: mockOrderId,
        userUuid: mockUserUuid,
        user: {
          uuid: mockUserUuid,
          role: EnumRoleOfUser.DEFAULT_USER,
          createdAt: new Date(),
          updatedAt: new Date(),
          email: 'test@example.com',
          phone_number: '1234567890',
          birth_day: '1990-01-01',
          first_name: 'John',
          second_name: 'Doe',
          password: '',
          avatarPath: '',
          verified: true,
          verifyToken: '',
          currentAddress: '',
        },
        addressUuid: 'address-uuid',
        uuid: 'order-uuid',
        createdAt: new Date(),
        updatedAt: new Date(),
        comment: 'Test comment',
        total: 1000,
        status: EnumOrderItemStatus.Pending,
        isDelivery: false,
        isActual: false,
      };

      jest.spyOn(prisma.order, 'findUnique').mockResolvedValue(mockOrder);
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockOrder.user);

      const result = await service.getOrderById(mockOrderId, mockUserUuid);

      expect(result).toEqual(mockOrder);
      expect(prisma.order.findUnique).toHaveBeenCalledWith({
        where: { orderId: mockOrderId },
        include: {
          items: { include: { product: { select: expect.any(Object) } } },
          user: true,
          address: true,
        },
      });
    });

    it('should throw HttpException if order is not found', async () => {
      const mockOrderId = 'ORDER123';
      const mockUserUuid = 'user-uuid';

      jest.spyOn(prisma.order, 'findUnique').mockResolvedValue(null);

      await expect(
        service.getOrderById(mockOrderId, mockUserUuid),
      ).rejects.toThrow(
        new HttpException('Order not found!', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('cancelOrder', () => {
    it('should cancel an order successfully', async () => {
      const mockOrderUuid = 'order-uuid';

      jest.spyOn(prisma.order, 'update').mockResolvedValue({
        uuid: 'order-uuid',
        orderId: 'ORDER123',
        addressUuid: 'address-uuid',
        createdAt: new Date(),
        updatedAt: new Date(),
        userUuid: 'user-uuid',
        comment: 'Test comment',
        total: 1000,
        status: 'Canceled',
        isDelivery: false,
        isActual: false,
      });

      const result = await service.cancelOrder(mockOrderUuid);

      expect(result).toBe(true);
      expect(prisma.order.update).toHaveBeenCalledWith({
        where: { uuid: mockOrderUuid },
        data: { status: 'Canceled' },
      });
    });
  });

  describe('updateStatus', () => {
    it('should update the status of an order and generate receipt if paid', async () => {
      const mockPaymentStatusDto: PaymentStatusDto = {
        orderUuid: 'order-uuid',
        status: 'Payed',
      };
      const mockOrder = {
        uuid: 'order-uuid',
        status: EnumOrderItemStatus.Payed,
        addressUuid: 'address-uuid',
        createdAt: new Date(),
        updatedAt: new Date(),
        userUuid: 'user-uuid',
        comment: 'Test comment',
        total: 1000,
        orderId: 'ORDER123',
        isDelivery: false,
        isActual: false,
      };

      const qrData = `${process.env.FRONTEND_URL}/order/${mockOrder.uuid}`;

      jest.spyOn(prisma.order, 'update').mockResolvedValue(mockOrder);
      jest.spyOn(prisma.orderItem, 'findMany').mockResolvedValue([]);
      jest
        .spyOn(qrCodeService, 'generateQRCode')
        .mockResolvedValue(await QRCode.toDataURL(qrData));

      const result = await service.updateStatus(mockPaymentStatusDto);

      expect(result).toEqual({
        uuid: mockOrder.uuid,
        status: mockOrder.status,
      });
      expect(prisma.order.update).toHaveBeenCalledWith({
        where: { uuid: mockPaymentStatusDto.orderUuid },
        data: { status: mockPaymentStatusDto.status },
      });
    });
  });
});
