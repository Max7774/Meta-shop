import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDto, AuthLoginDto } from './dto/auth.dto';
import { BadGatewayException } from '@nestjs/common';

// Mock dependencies
const mockAuthService = {
  login: jest.fn(),
  getNewToken: jest.fn(),
  verifyAccessToken: jest.fn(),
  register: jest.fn(),
  phoneRegister: jest.fn(),
  resetPassword: jest.fn(),
  updatePassword: jest.fn(),
};

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should successfully login a user and return tokens', async () => {
      const authLoginDto: AuthLoginDto = {
        email: 'test@example.com',
        password: 'password',
      };

      mockAuthService.login.mockResolvedValue({
        user: {
          verified: true,
          uuid: '12345',
          email: 'test@example.com',
          role: 'DEFAULT_USER',
        },
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken',
      });

      const result = await authController.login(authLoginDto);
      expect(result).toEqual({
        user: expect.objectContaining({ email: 'test@example.com' }),
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken',
      });
      expect(authService.login).toHaveBeenCalledWith(authLoginDto);
    });
  });

  describe('getNewToken', () => {
    it('should return new tokens for a valid refresh token', async () => {
      const refreshTokenDto = { refreshToken: 'validRefreshToken' };

      mockAuthService.getNewToken.mockResolvedValue({
        user: {
          verified: true,
          uuid: '12345',
          email: 'test@example.com',
          role: 'DEFAULT_USER',
        },
        accessToken: 'newAccessToken',
        refreshToken: 'newRefreshToken',
      });

      const result = await authController.getNewToken(refreshTokenDto);
      expect(result).toEqual({
        user: expect.objectContaining({ email: 'test@example.com' }),
        accessToken: 'newAccessToken',
        refreshToken: 'newRefreshToken',
      });
      expect(authService.getNewToken).toHaveBeenCalledWith(
        refreshTokenDto.refreshToken,
      );
    });
  });

  describe('register', () => {
    it('should successfully register a user', async () => {
      const authDto: AuthDto = {
        first_name: 'John',
        second_name: 'Doe',
        phone_number: '1234567890',
        email: 'test@example.com',
        password: 'password',
        role: 'DEFAULT_USER',
        birth_day: '1990-01-01',
      };

      mockAuthService.register.mockResolvedValue('Success');

      const result = await authController.register(authDto);
      expect(result).toEqual('Success');
      expect(authService.register).toHaveBeenCalledWith(authDto);
    });

    it('should throw BadGatewayException if user already exists', async () => {
      const authDto: AuthDto = {
        first_name: 'John',
        second_name: 'Doe',
        phone_number: '1234567890',
        email: 'test@example.com',
        password: 'password',
        role: 'DEFAULT_USER',
        birth_day: '1990-01-01',
      };

      mockAuthService.register.mockRejectedValue(
        new BadGatewayException('User already exists'),
      );

      await expect(authController.register(authDto)).rejects.toThrow(
        BadGatewayException,
      );
    });
  });

  describe('resetPassword', () => {
    it('should send reset password email for an existing user', async () => {
      const resetPasswordDto = { email: 'test@example.com' };

      mockAuthService.resetPassword.mockResolvedValue('OK');

      const result = await authController.resetPassword(resetPasswordDto);
      expect(result).toEqual('OK');
      expect(authService.resetPassword).toHaveBeenCalledWith(
        resetPasswordDto.email,
      );
    });
  });

  describe('updatePassword', () => {
    it('should successfully update the password for a user', async () => {
      const resetPasswordType = {
        new_pass: 'newPassword',
        resetToken: 'validResetToken',
      };

      mockAuthService.updatePassword.mockResolvedValue('OK');

      const result = await authController.updatePassword(resetPasswordType);
      expect(result).toEqual('OK');
      expect(authService.updatePassword).toHaveBeenCalledWith(
        resetPasswordType,
      );
    });
  });
});
