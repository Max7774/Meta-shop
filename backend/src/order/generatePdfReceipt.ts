import { Order, OrderItem, Product } from '@prisma/client';
import * as PDFDocument from 'pdfkit';
import { join } from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { unitofmeasurementData } from 'src/utils/unitofmeasurementData';

export async function generatePdfReceipt(
  orderItems: (OrderItem & { product: Product })[],
  order: Order,
  qrCodeDataURL: string,
) {
  const receiptsDir = join(process.cwd(), 'receipts');

  if (!existsSync(receiptsDir)) {
    mkdirSync(receiptsDir);
    console.log('Receipts directory created.');
  }

  const doc = new PDFDocument();

  const fontPath = join(process.cwd(), 'fonts', 'Roboto-Regular.ttf');

  doc.registerFont('Roboto', fontPath);

  doc.font('Roboto');

  const filePath = join(receiptsDir, `receipt-${order.orderId}.pdf`);

  const writeStream = createWriteStream(filePath);
  doc.pipe(writeStream);

  doc.fontSize(20).text('Чек', { align: 'center' });

  doc.moveDown();

  doc.fontSize(12).text(`Номер заказа: ${order.orderId}`);
  doc.text(`Дата заказа: ${new Date(order.createdAt).toLocaleDateString()}`);
  doc.text(`Доставка: ${order.isDelivery ? '800' : '0'} тенге`);
  doc.text(`Общая сумма: ${order.total} тенге`);

  doc.moveDown();

  doc.text('Товары:');

  orderItems.forEach((item) => {
    doc.text(
      `- ${item.product.name} ${item.quantity}/${
        unitofmeasurementData[item.product.unitofmeasurement]
      } x ${item.price} тенге`,
    );
  });

  //   const qrImageBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64');

  //   doc.moveDown();

  //   doc.fontSize(16).text('Сканируйте QR-код для просмотра заказа:', {
  //     align: 'center',
  //   });

  //   doc.moveDown();

  //   doc.image(qrImageBuffer, {
  //     fit: [150, 150],
  //     align: 'center',
  //     valign: 'center',
  //   });

  if (qrCodeDataURL && qrCodeDataURL.startsWith('data:image/png;base64,')) {
    const base64Data = qrCodeDataURL.split(',')[1];
    if (base64Data) {
      const qrImageBuffer = Buffer.from(base64Data, 'base64');

      doc.moveDown();

      doc.fontSize(16).text('Сканируйте QR-код для просмотра заказа:', {
        align: 'center',
      });

      doc.moveDown();

      doc.image(qrImageBuffer, {
        fit: [150, 150],
        align: 'center',
        valign: 'center',
      });
    } else {
      console.error('Ошибка: Некорректный формат данных QR-кода.');
    }
  } else {
    console.error('Ошибка: Некорректный формат URL-данных QR-кода.');
  }

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => {
      resolve(true);
    });
    writeStream.on('error', (err) => {
      reject(err);
    });
  });
}
