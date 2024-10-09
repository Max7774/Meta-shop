import { Injectable } from '@nestjs/common';
import { Address, Order, OrderItem, Product } from '@prisma/client';
import * as TelegramBot from 'node-telegram-bot-api';

interface IOrder extends Order {
  items: (OrderItem & { product: Product })[];
  address: Address;
  user: {
    first_name: string;
    second_name: string;
    phone_number: string;
  };
}

@Injectable()
export class BotService {
  private bot: TelegramBot;

  constructor() {
    this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
      polling: true,
    });
  }

  async sendOrderNotification(order: IOrder) {
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const message = this.constructOrderMessage(order);

    return await this.bot.sendMessage(chatId, message, {
      parse_mode: 'Markdown',
    });
  }

  private constructOrderMessage(order: IOrder): string {
    let message = `🆕 *Новый заказ получен!*\n\n`;
    message += `📄 *ID заказа:* \`${order.orderId}\`\n`;
    message += `💰 *Сумма заказа:* \`${order.total}₸\`\n`;
    message += `🛵 *Стоимость доставки:* ${order.isDelivery ? 800 : 0}₸\n`;
    message += `📅 *Дата заказа:* \`${order.createdAt.toLocaleString()}\`\n`;

    if (order.comment) {
      message += `📝 *Комментарий:* ${order.comment}\n`;
    }

    message += `\n📦 *Состав заказа:*\n`;
    order.items.forEach((item) => {
      message += `- ${item.product.name} x${item.quantity}\n`;
    });

    message += `\n🚚 *Адрес доставки:*\n`;
    message += `${order.address.street}, ${order.address.town}\n`;
    message += `Дом: ${order.address.house}, Подъезд: ${
      order.address.entrance || 'не указан'
    }\n`;
    if (order.address.intercom) {
      message += `Домофон: ${order.address.intercom}, Этаж: ${order.address.floor}\n`;
    }

    if (order.user.first_name) {
      message += `\n👤 *Автор заказа:* ${order.user.first_name} ${order.user.second_name}`;
    }
    message += `\n👤 *Телефон:* ${order.user.phone_number}`;

    return message;
  }
}
