import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from './address.service';
import { PrismaService } from '../prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { User } from '@prisma/client';

// Mock data for testing
export const mockUser: User = {
  uuid: '12345',
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'test@example.com',
  phone_number: '1234567890',
  birth_day: '1990-01-01',
  first_name: 'John',
  second_name: 'Doe',
  password: 'hashedPassword',
  avatarPath: 'default-avatar.png',
  verified: true,
  verifyToken: null,
  role: 'DEFAULT_USER',
  currentAddress: '123 Street',
};

// Mock dependencies
const mockPrismaService = {
  address: {
    create: jest.fn().mockResolvedValue({
      uuid: '67890',
      town: 'Sample Town',
      street: 'Sample Street',
      house: '123',
      apartment: '12A',
      intercom: '123',
      entrance: 'B',
      floor: '3',
      userUuid: mockUser.uuid,
    }),
    findMany: jest.fn().mockResolvedValue([]),
    delete: jest.fn().mockResolvedValue({
      uuid: '67890',
    }),
  },
  user: {
    update: jest.fn().mockResolvedValue({
      ...mockUser,
      currentAddress: '67890',
    }),
  },
};

describe('AddressService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    addressService = module.get<AddressService>(AddressService);
    prismaService = module.get<PrismaService>(PrismaService);
  });
  let addressService: AddressService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    addressService = module.get<AddressService>(AddressService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(addressService).toBeDefined();
  });

  describe('createAddress', () => {
    it('should successfully set current address for the user', async () => {
      const createAddressDto: CreateAddressDto = {
        town: 'Sample Town',
        street: 'Sample Street',
        house: '123',
        apartment: '12A',
        intercom: '123',
        entrance: 'B',
        floor: '3',
      };

      jest
        .spyOn(prismaService.user, 'update')
        .mockResolvedValueOnce({ ...mockUser, currentAddress: '67890' });

      const result = await addressService.create(
        createAddressDto,
        mockUser.uuid,
      );
      expect(result).toEqual(
        expect.objectContaining({
          town: createAddressDto.town,
          street: createAddressDto.street,
          house: createAddressDto.house,
          apartment: createAddressDto.apartment,
        }),
      );
      expect(prismaService.address.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          ...createAddressDto,
          user: { connect: { uuid: mockUser.uuid } },
        }),
      });
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { uuid: mockUser.uuid },
        data: { currentAddress: '67890' },
      });
    });
    it('should successfully create a new address', async () => {
      const createAddressDto: CreateAddressDto = {
        town: 'Sample Town',
        street: 'Sample Street',
        house: '123',
        apartment: '12A',
        intercom: '123',
        entrance: 'B',
        floor: '3',
      };

      const result = await addressService.create(
        createAddressDto,
        mockUser.uuid,
      );
      expect(result).toEqual(
        expect.objectContaining({
          town: createAddressDto.town,
          street: createAddressDto.street,
          house: createAddressDto.house,
          apartment: createAddressDto.apartment,
        }),
      );
      expect(prismaService.address.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          ...createAddressDto,
          user: {
            connect: {
              uuid: mockUser.uuid,
            },
          },
          uuid: expect.any(String),
        }),
      });
    });
  });

  describe('getAddresses', () => {
    it('should successfully retrieve all addresses for a user', async () => {
      prismaService.address.findMany = jest.fn().mockResolvedValueOnce([
        {
          uuid: '67890',
          town: 'Sample Town',
          street: 'Sample Street',
          house: '123',
          apartment: '12A',
          intercom: '123',
          entrance: 'B',
          floor: '3',
          userUuid: mockUser.uuid,
        },
      ]);

      const result = await addressService.findAll(mockUser.uuid);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(
        expect.objectContaining({
          uuid: '67890',
          town: 'Sample Town',
        }),
      );
      expect(prismaService.address.findMany).toHaveBeenCalledWith({
        where: {
          user: {
            uuid: mockUser.uuid,
          },
        },
      });
    });
    it('should return an array of addresses for the user', async () => {
      jest.spyOn(prismaService.address, 'findMany').mockResolvedValueOnce([
        {
          uuid: '67890',
          town: 'Sample Town',
          street: 'Sample Street',
          createdAt: new Date(),
          updatedAt: new Date(),
          house: '123',
          apartment: '12A',
          intercom: '123',
          entrance: 'B',
          floor: '3',
          userUuid: mockUser.uuid,
        },
      ]);

      const result = await addressService.findAll(mockUser.uuid);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(
        expect.objectContaining({
          uuid: '67890',
          town: 'Sample Town',
        }),
      );
      expect(prismaService.address.findMany).toHaveBeenCalledWith({
        where: {
          user: {
            uuid: mockUser.uuid,
          },
        },
      });
    });
  });

  describe('setCurrentAddress', () => {
    it('should successfully set the current address for a user', async () => {
      const addressUuid = '67890';

      prismaService.user.update = jest
        .fn()
        .mockResolvedValueOnce({ ...mockUser, currentAddress: addressUuid });

      const result = await addressService.setCurrentAddress(
        addressUuid,
        mockUser.uuid,
      );
      expect(result).toEqual(addressUuid);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { uuid: mockUser.uuid },
        data: { currentAddress: addressUuid },
      });
    });
  });
});
