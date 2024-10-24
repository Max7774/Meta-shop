import { Test, TestingModule } from '@nestjs/testing';
import { QRCodeService } from './qrcode.service';
import * as QRCode from 'qrcode';

jest.mock('qrcode', () => ({
  toDataURL: jest.fn(),
}));

describe('QRCodeService', () => {
  let service: QRCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QRCodeService],
    }).compile();

    service = module.get<QRCodeService>(QRCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateQRCode', () => {
    it('should generate a QR code and return a data URL', async () => {
      const testData = 'test-data';
      const mockDataURL = 'data:image/png;base64,MOCKED_BASE64_DATA';
      (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockDataURL);

      const result = await service.generateQRCode(testData);

      expect(result).toEqual(mockDataURL);
      expect(QRCode.toDataURL).toHaveBeenCalledWith(testData);
    });

    it('should throw an error if QR code generation fails', async () => {
      const testData = 'test-data';
      (QRCode.toDataURL as jest.Mock).mockRejectedValue(
        new Error('Generation failed'),
      );

      await expect(service.generateQRCode(testData)).rejects.toThrow(
        'Ошибка при генерации QR-кода',
      );
    });
  });
});
