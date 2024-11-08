import { Test, TestingModule } from '@nestjs/testing';
import { BotService } from './bot.service';
import * as TelegramBot from 'node-telegram-bot-api';
import { IOrder } from './bot.service';
import { BadRequestException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import * as dotenv from 'dotenv';

dotenv.config();
jest.mock('node-telegram-bot-api');
const mockTelegramBot = TelegramBot as jest.MockedClass<typeof TelegramBot>;

export const mockOrder: IOrder = {
  uuid: 'order-uuid',
  createdAt: new Date(),
  updatedAt: new Date(),
  orderId: 'ORDER12345',
  total: 10000,
  status: 'Pending',
  isDelivery: true,
  isActual: true,
  comment: '',
  addressUuid: 'address-uuid',
  userUuid: 'user-uuid',
  items: [
    {
      uuid: 'item-uuid',
      createdAt: new Date(),
      updatedAt: new Date(),
      quantity: new Decimal(2),
      price: 5000,
      inStock: true,
      productUuid: 'product-uuid',
      orderUuid: 'order-uuid',
      product: {
        uuid: 'product-uuid',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Test Product',
        slug: 'test-product',
        description: 'This is a test product',
        peculiarities: 'None',
        images: ['test-image.png'],
        isWholesale: false,
        unitofmeasurement: 'pcs',
        inStock: true,
        isDeleted: false,
        userUuid: 'user-uuid',
        subcategoryUuid: 'subcategory-uuid',
      },
    },
  ],
  address: {
    uuid: 'address-uuid',
    createdAt: new Date(),
    updatedAt: new Date(),
    town: 'Sample Town',
    street: 'Sample Street',
    house: '123',
    apartment: '12A',
    intercom: '123',
    entrance: 'B',
    floor: '3',
    userUuid: 'user-uuid',
  },
  user: {
    first_name: 'John',
    second_name: 'Doe',
    phone_number: '1234567890',
  },
};

describe('BotService', () => {
  let botService: BotService;
  let bot: jest.Mocked<TelegramBot>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotService],
    }).compile();

    botService = module.get<BotService>(BotService);
    bot = new mockTelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
      polling: false,
    }) as jest.Mocked<TelegramBot>;
    botService['bot'] = bot;
  });

  it('should be defined', () => {
    expect(botService).toBeDefined();
  });

  describe('sendOrderNotification', () => {
    it('should send a notification with the correct message format', async () => {
      jest.spyOn(bot, 'sendMessage').mockResolvedValueOnce({} as any);
      await botService.sendOrderNotification(mockOrder);

      expect(bot.sendMessage).toHaveBeenCalledWith(
        process.env.TELEGRAM_CHAT_ID,
        expect.stringContaining('*Новый заказ получен!*'),
        { parse_mode: 'Markdown' },
      );
    });

    it('should throw BadRequestException if sending the message fails', async () => {
      jest
        .spyOn(bot, 'sendMessage')
        .mockRejectedValueOnce(
          new BadRequestException('Failed to send message'),
        );

      await expect(botService.sendOrderNotification(mockOrder)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
