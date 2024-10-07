import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class QRCodeService {
  async generateQRCode(data: string): Promise<string> {
    try {
      return await QRCode.toDataURL(data);
    } catch (error) {
      throw new Error('Ошибка при генерации QR-кода');
    }
  }
}
