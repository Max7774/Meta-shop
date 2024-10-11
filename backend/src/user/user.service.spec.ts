import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/user.dto';
import { BadRequestException } from '@nestjs/common';
import { EnumRoleOfUser } from '@prisma/client';

jest.mock('argon2', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
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
    // Используйте "?" чтобы убедиться, что module был инициализирован
    await module?.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('byId', () => {
    it('should return a user by uuid', async () => {
      const uuid = 'user-uuid';
      const mockUser = {
        uuid,
        email: 'test@example.com',
        first_name: 'John',
        second_name: 'Doe',
        role: EnumRoleOfUser.DEFAULT_USER,
        createdAt: new Date(),
        updatedAt: new Date(),
        phone_number: '1234567890',
        birth_day: '1990-01-01',
        password: 'hashedPassword',
        avatarPath: 'avatar.png',
        verified: true,
        verifyToken: 'token',
        currentAddress: 'current-address',
      };

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

      const mockUser = {
        uuid,
        email: dto.email,
        first_name: dto.first_name,
        second_name: dto.second_name,
        avatarPath: dto.avatarPath,
        phone_number: dto.phone_number,
        password: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
        birth_day: '1990-01-01',
        role: EnumRoleOfUser.DEFAULT_USER,
        verified: true,
        verifyToken: 'token',
        currentAddress: 'current-address',
      };

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser);
      jest.spyOn(prisma.user, 'update').mockResolvedValue(mockUser);

      const result = await service.updateProfile(uuid, dto);
      expect(result).toEqual(mockUser);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { uuid },
        data: {
          email: dto.email,
          first_name: dto.first_name,
          second_name: dto.second_name,
          avatarPath: dto.avatarPath,
          phone_number: dto.phone_number,
          password: 'hashedPassword',
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
        password: 'hashedPassword',
        verified: true,
        verifyToken: 'token',
        currentAddress: 'current-address',
      });

      await expect(service.updateProfile(uuid, dto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('toggleFavorite', () => {
    it('should add product to favorites if not already exists', async () => {
      const uuid = 'user-uuid';
      const productUuid = 'product-uuid';
      const mockUser = {
        uuid,
        favorites: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        email: 'test@example.com',
        first_name: 'John',
        second_name: 'Doe',
        role: EnumRoleOfUser.DEFAULT_USER,
        phone_number: '1234567890',
        birth_day: '1990-01-01',
        password: 'hashedPassword',
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
      };

      jest.spyOn(service, 'byId').mockResolvedValue(mockUser);
      jest.spyOn(prisma.user, 'update').mockResolvedValue(mockUser);

      const result = await service.toggleFavorite(uuid, productUuid);
      expect(result).toBe('Success');
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { uuid },
        data: {
          favorites: {
            connect: { id: productUuid },
          },
        },
      });
    });

    it('should remove product from favorites if it already exists', async () => {
      const uuid = 'user-uuid';
      const productUuid = 'product-uuid';
      const mockUser = {
        uuid,
        favorites: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        email: 'test@example.com',
        first_name: 'John',
        second_name: 'Doe',
        role: EnumRoleOfUser.DEFAULT_USER,
        phone_number: '1234567890',
        birth_day: '1990-01-01',
        password: 'hashedPassword',
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
      };

      jest.spyOn(service, 'byId').mockResolvedValue(mockUser);
      jest.spyOn(prisma.user, 'update').mockResolvedValue(mockUser);

      const result = await service.toggleFavorite(uuid, productUuid);
      expect(result).toBe('Success');
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { uuid },
        data: {
          favorites: {
            connect: { id: productUuid },
          },
        },
      });
    });
  });

  describe('getAll', () => {
    it('should return all users', async () => {
      const mockUsers = [
        {
          uuid: 'user-uuid-1',
          email: 'user1@example.com',
          first_name: 'User',
          second_name: 'One',
          avatarPath: 'avatar1.png',
          phone_number: '1234567890',
          birth_day: '1990-01-01',
          password: 'hashedPassword',
          verified: true,
          verifyToken: null,
          role: EnumRoleOfUser.DEFAULT_USER,
          orders: [],
          addresses: [],
          currentAddress: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: 'user-uuid-2',
          email: 'user2@example.com',
          first_name: 'User',
          second_name: 'Two',
          birth_day: '1990-01-01',
          password: 'hashedPassword',
          verified: true,
          verifyToken: null,
          avatarPath: 'avatar2.png',
          phone_number: '0987654321',
          role: EnumRoleOfUser.DEFAULT_USER,
          orders: [],
          addresses: [],
          currentAddress: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(mockUsers);

      const result = await service.getAll();
      expect(result).toEqual(mockUsers);
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        select: expect.any(Object),
      });
    });
  });
});
