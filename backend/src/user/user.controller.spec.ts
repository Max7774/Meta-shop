import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { EnumRoleOfUser } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

function createMockUser(overrides = {}): any {
  return {
    uuid: 'user-uuid',
    favorites: [],
    updatedAt: new Date(),
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

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            byId: jest.fn(),
            updateProfile: jest.fn(),
            toggleFavorite: jest.fn(),
            getAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProfile', () => {
    it('should call UserService.byId with correct parameters', async () => {
      const userUuid = 'user-uuid';
      const mockUser = createMockUser();

      jest.spyOn(service, 'byId').mockResolvedValue(mockUser);

      const result = await controller.getProfile(userUuid);
      expect(result).toEqual(mockUser);
      expect(service.byId).toHaveBeenCalledWith(userUuid);
    });

    it('should throw an error if user is not found', async () => {
      jest
        .spyOn(service, 'byId')
        .mockRejectedValue(new NotFoundException('User not found'));

      await expect(controller.getProfile('invalid-uuid')).rejects.toThrow(
        'User not found',
      );
    });
  });

  describe('updateProfile', () => {
    it('should call UserService.updateProfile with correct parameters', async () => {
      const userUuid = 'user-uuid';
      const dto: UserDto = {
        first_name: 'Updated John',
        second_name: 'Updated Doe',
        email: 'updated@example.com',
        avatarPath: 'new-avatar.png',
        phone_number: '1234567890',
      };

      jest.spyOn(service, 'updateProfile').mockResolvedValue(createMockUser());

      const result = await controller.updateProfile(userUuid, dto);
      expect(result).toEqual(expect.objectContaining(createMockUser()));
      expect(service.updateProfile).toHaveBeenCalledWith(userUuid, dto);
    });
  });

  describe('toggleFavorites', () => {
    it('should call UserService.toggleFavorite with correct parameters', async () => {
      const userUuid = 'user-uuid';
      const productUuid = 'product-uuid';

      jest.spyOn(service, 'toggleFavorite').mockResolvedValue(undefined);

      const result = await controller.toggleFavorites(userUuid, productUuid);
      expect(result).toBeUndefined();
      expect(service.toggleFavorite).toHaveBeenCalledWith(
        userUuid,
        productUuid,
      );
    });
  });

  describe('getAll', () => {
    it('should call UserService.getAll and return the list of users', async () => {
      const mockUsers = [createMockUser(), createMockUser()];

      jest.spyOn(service, 'getAll').mockResolvedValue(mockUsers);

      const result = await controller.getAll();
      expect(result).toEqual(mockUsers);
      expect(service.getAll).toHaveBeenCalled();
    });
  });
});
