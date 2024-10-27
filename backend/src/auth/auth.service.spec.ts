import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import {
  UnauthorizedException,
  NotFoundException,
  BadGatewayException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { generateToken } from 'src/utils/generateToken';
import * as argon2 from 'argon2';
import { ResetPasswordType } from './auth.interface';
import { PrismaService } from '../prisma.service';

jest.mock('src/utils/generateToken', () => ({
  generateToken: jest.fn().mockReturnValue('verificationToken'),
}));
jest.mock('argon2');
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue('OK'),
  }),
}));

const mockUser: User = {
  companyUuid: 'company-uuid',
  uuid: '12345',
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'test@example.com',
  phone_number: '1234567890',
  birth_day: '1990-01-01',
  first_name: 'John',
  second_name: 'Doe',
  password: '',
  avatarPath: 'default-avatar.png',
  verified: true,
  verifyToken: null,
  role: 'DEFAULT_USER',
  currentAddress: '123 Street',
};

// Mock dependencies
const mockPrismaService = {
  user: {
    findUnique: jest.fn().mockResolvedValue(mockUser),
    create: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(mockUser),
  },
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('mockAccessToken'),
  verify: jest.fn().mockReturnValue({ uuid: mockUser.uuid }),
};

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should return a valid access and refresh token for valid credentials', async () => {
      jest
        .spyOn(authService as any, 'validateUser')
        .mockResolvedValue(mockUser);
      const result = await authService.login({
        email: 'test@example.com',
        password: '',
      });
      expect(result).toEqual({
        user: expect.objectContaining({
          uuid: mockUser.uuid,
          email: mockUser.email,
        }),
        accessToken: 'mockAccessToken',
        refreshToken: 'mockAccessToken',
      });
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      jest
        .spyOn(authService as any, 'validateUser')
        .mockRejectedValue(new UnauthorizedException());
      await expect(
        authService.login({
          email: 'invalid@example.com',
          password: '',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('verifyAccessToken', () => {
    it('should return user role for a valid access token', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValueOnce(mockUser);
      const result = await authService.verifyAccessToken('mockAccessToken');
      expect(result).toBe(mockUser.role);
    });
    it('should throw UnauthorizedException for an invalid access token', async () => {
      jest.spyOn(jwtService, 'verify').mockImplementation((token) => {
        if (token === 'mockAccessToken') {
          return { uuid: mockUser.uuid };
        }
        throw new Error('Invalid token');
      });
      await expect(
        authService.verifyAccessToken('invalidToken'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('should successfully register a user', async () => {
      const dto: AuthDto = {
        first_name: 'John',
        second_name: 'Doe',
        birth_day: '1990-01-01',
        phone_number: '1234567890',
        email: 'test@example.com',
        password: '',
        role: 'DEFAULT_USER',
      };

      // Исправляем поведение findUnique, чтобы возвращал null (пользователь не найден)
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);

      (generateToken as jest.Mock).mockReturnValue('verificationToken');
      (argon2.hash as jest.Mock).mockResolvedValue('');

      const result = await authService.register(dto);
      expect(result).toEqual('Success');
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email: dto.email,
          first_name: dto.first_name,
          second_name: dto.second_name,
        }),
      });
    });

    it('should throw BadGatewayException if user already exists', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValueOnce(mockUser);

      const dto: AuthDto = {
        first_name: 'John',
        second_name: 'Doe',
        birth_day: '1990-01-01',
        phone_number: '1234567890',
        email: 'test@example.com',
        password: '',
        role: 'DEFAULT_USER',
      };

      await expect(authService.register(dto)).rejects.toThrow(
        BadGatewayException,
      );
    });
  });

  describe('getNewToken', () => {
    it('should return a new access token for a valid refresh token', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);
      const result = await authService.getNewToken('mockAccessToken');
      expect(result).toEqual({
        user: expect.objectContaining({
          uuid: mockUser.uuid,
          email: mockUser.email,
        }),
        accessToken: 'mockAccessToken',
      });
    });

    it('should throw UnauthorizedException for an invalid refresh token', async () => {
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error('Invalid token');
      });
      await expect(authService.getNewToken('invalidToken')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('phoneRegister', () => {
    it('should register a user by phone number and return tokens', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);
      jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValueOnce({ ...mockUser, phone_number: '1234567890' });
      const result = await authService.phoneRegister({
        phone_number: '1234567890',
      });
      expect(result).toEqual({
        user: expect.objectContaining({
          email: 'test@example.com',
          role: 'DEFAULT_USER',
          uuid: '12345',
          verified: true,
        }),
        accessToken: 'mockAccessToken',
        refreshToken: 'mockAccessToken',
      });
    });
  });

  describe('resetPassword', () => {
    it('should send reset password email for an existing user', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);
      const result = await authService.resetPassword('test@example.com');
      expect(result).toEqual('OK');
    });

    it('should throw NotFoundException if user does not exist', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);
      await expect(
        authService.resetPassword('invalid@example.com'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updatePassword', () => {
    it('should successfully update the password for a user with a valid reset token', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);
      const body: ResetPasswordType = {
        new_pass: '',
        resetToken: 'validToken',
      };

      const result = await authService.updatePassword(body);
      expect(result).toEqual('OK');
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { uuid: mockUser.uuid },
        data: expect.objectContaining({
          password: expect.any(String),
          verified: true,
          verifyToken: null,
        }),
      });
    });

    it('should throw NotFoundException if reset token is invalid', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);
      const body: ResetPasswordType = {
        new_pass: '',
        resetToken: 'invalidToken',
      };

      await expect(authService.updatePassword(body)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
