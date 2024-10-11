import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { mockUser } from './address.service.spec'; // предположим, что вы можете использовать mockUser из теста сервиса

// Mock AddressService
const mockAddressService = {
  create: jest.fn(),
  findAll: jest.fn(),
  setCurrentAddress: jest.fn(),
};

describe('AddressController', () => {
  let addressController: AddressController;
  let addressService: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [{ provide: AddressService, useValue: mockAddressService }],
    }).compile();

    addressController = module.get<AddressController>(AddressController);
    addressService = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(addressController).toBeDefined();
  });

  describe('create', () => {
    it('should call addressService.createAddress with correct parameters', async () => {
      const createAddressDto: CreateAddressDto = {
        town: 'Sample Town',
        street: 'Sample Street',
        house: '123',
        apartment: '12A',
        intercom: '123',
        entrance: 'B',
        floor: '3',
      };

      mockAddressService.create.mockResolvedValue({
        ...createAddressDto,
        uuid: '12345',
      });

      const result = await addressController.create(
        createAddressDto,
        mockUser.uuid,
      );
      expect(result).toEqual(
        expect.objectContaining({
          town: createAddressDto.town,
          street: createAddressDto.street,
          house: createAddressDto.house,
        }),
      );
      expect(addressService.create).toHaveBeenCalledWith(
        createAddressDto,
        mockUser.uuid,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of addresses for the user', async () => {
      const addresses = [
        {
          uuid: '12345',
          town: 'Sample Town',
          street: 'Sample Street',
          house: '123',
          apartment: '12A',
          intercom: '123',
          entrance: 'B',
          floor: '3',
        },
      ];

      mockAddressService.findAll.mockResolvedValue(addresses);

      const result = await addressController.findAll(mockUser.uuid);
      expect(result).toEqual(addresses);
      expect(addressService.findAll).toHaveBeenCalledWith(mockUser.uuid);
    });
  });

  describe('findOne', () => {
    it('should call addressService.setCurrentAddress with correct parameters', async () => {
      const addressUuid = '67890';
      mockAddressService.setCurrentAddress.mockResolvedValue(addressUuid);

      const result = await addressController.findOne(
        addressUuid,
        mockUser.uuid,
      );
      expect(result).toEqual(addressUuid);
      expect(addressService.setCurrentAddress).toHaveBeenCalledWith(
        addressUuid,
        mockUser.uuid,
      );
    });
  });
});
