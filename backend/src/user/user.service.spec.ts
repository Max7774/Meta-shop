import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/user.dto';
import { BadRequestException } from '@nestjs/common';
import { EnumRoleOfUser } from '@prisma/client';

function createMockUser(overrides = {}): any {
  return {
    uuid: 'user-uuid',
    favorites: [],
    updatedAt: new Date('2024-10-11T18:42:20.344Z'),
    createdAt: new Date('2024-10-11T18:42:20.344Z'),
    email: 'test@example.com',
    first_name: 'John',
    second_name: 'Doe',
    role: EnumRoleOfUser.DEFAULT_USER,
    phone_number: '1234567890',
    birth_day: '1990-01-01',
    password: '',
    avatarPath: 'avatar.png',
    verified: true,
    verifyToken: 'token',
    currentAddress: 'current-address',
    addresses: [],
    orders: [],
    reviews: [],
    clicks: [],
    _count: {
      addresses: 0,
      orders: 0,
      favorites: 0,
      reviews: 0,
      clicks: 0,
    },
    ...overrides,
  };
}

jest.mock('argon2', () => ({
  hash: jest.fn().mockResolvedValue(''),
}));

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;
  let module: TestingModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              update: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await module?.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('byId', () => {
    it('should return a user by uuid', async () => {
      const uuid = 'user-uuid';

      const mockUser = createMockUser();

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser);

      const result = await service.byId(uuid);

      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { uuid },
        select: expect.any(Object),
      });
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
      await expect(service.byId('invalid-uuid')).rejects.toThrow(
        'User not found',
      );
    });
  });

  describe('updateProfile', () => {
    it('should update user profile', async () => {
      const uuid = 'user-uuid';
      const dto: UserDto = {
        email: 'updated@example.com',
        first_name: 'Jane',
        second_name: 'Doe',
        avatarPath: 'new-avatar.png',
        phone_number: '1234567890',
      };

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(createMockUser());
      jest.spyOn(prisma.user, 'update').mockResolvedValue(createMockUser());

      const result = await service.updateProfile(uuid, dto);
      expect(result).toEqual(createMockUser());
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { uuid },
        data: {
          email: dto.email,
          first_name: dto.first_name,
          second_name: dto.second_name,
          avatarPath: dto.avatarPath,
          phone_number: dto.phone_number,
          password: '',
        },
        select: expect.any(Object),
      });
    });

    it('should throw BadRequestException if email is already in use', async () => {
      const uuid = 'user-uuid';
      const dto: UserDto = {
        email: 'existing@example.com',
        first_name: 'Jane',
        second_name: 'Doe',
        avatarPath: 'avatar.png',
        phone_number: '1234567890',
      };

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({
        uuid: 'different-uuid',
        email: dto.email,
        createdAt: new Date(),
        updatedAt: new Date(),
        first_name: 'Jane',
        second_name: 'Doe',
        phone_number: '1234567890',
        avatarPath: 'avatar.png',
        role: EnumRoleOfUser.DEFAULT_USER,
        birth_day: '',
        password: '',
        verified: true,
        verifyToken: 'token',
        currentAddress: 'current-address',
        companyUuid: 'company-uuid',
      });

      await expect(service.updateProfile(uuid, dto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getAll', () => {
    it('should return all users', async () => {
      const mockUsers = [createMockUser(), createMockUser()];

      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(mockUsers);

      const result = await service.getAll({});
      expect(result).toEqual(mockUsers);
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        select: {
          addresses: true,
          avatarPath: true,
          createdAt: true,
          currentAddress: true,
          email: true,
          first_name: true,
          orders: true,
          phone_number: true,
          role: true,
          second_name: true,
          uuid: true,
        },
        where: {},
      });
    });
  });
});
