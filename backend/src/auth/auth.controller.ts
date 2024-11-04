import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDto, AuthLoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto, ResetPasswordDto } from './dto/refresh-token.dto';
import { PhoneRegister, ResetPasswordType } from './auth.interface';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            verified: {
              type: 'boolean',
            },
            uuid: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string' },
          },
        },
        accessToken: {
          type: 'string',
        },
        refreshToken: {
          type: 'string',
        },
      },
    },
  })
  async login(@Body() dto: AuthLoginDto) {
    return this.authService.login(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login/access-token')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'New access token generated',
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            verified: { type: 'boolean', example: true },
            uuid: { type: 'string', example: 'user-uuid' },
            email: { type: 'string', example: 'user@example.com' },
            role: { type: 'string', example: 'DEFAULT_USER' },
          },
        },
        accessToken: { type: 'string', example: 'newAccessToken' },
        refreshToken: { type: 'string', example: 'newRefreshToken' },
      },
    },
  })
  async getNewToken(@Body() dto: RefreshTokenDto) {
    try {
      return await this.authService.getNewToken(dto.refreshToken);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('verify/:token')
  @ApiOperation({ summary: 'Verify email using token' })
  @ApiResponse({
    status: 200,
    description: 'Email verification successful',
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            verified: { type: 'boolean', example: true },
            uuid: { type: 'string', example: 'user-uuid' },
            email: { type: 'string', example: 'user@example.com' },
            role: { type: 'string', example: 'DEFAULT_USER' },
          },
        },
        accessToken: { type: 'string', example: 'someAccessToken' },
        refreshToken: { type: 'string', example: 'someRefreshToken' },
      },
    },
  })
  async registerMail(@Param('token') token: string) {
    return this.authService.verifyToken(token);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('verify-token')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer access token',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Token verification result',
    schema: {
      type: 'boolean',
      example: false,
    },
  })
  async checkToken(@Headers('authorization') authorization: string) {
    const accessToken = authorization.replace('Bearer ', '');
    return await this.authService.verifyAccessToken(accessToken);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        first_name: { type: 'string', example: 'John' },
        second_name: { type: 'string', example: 'Doe' },
        town: { type: 'string', example: 'New York' },
        birth_day: { type: 'string', example: '1990-01-01' },
        phone_number: { type: 'string', example: '1234567890' },
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'password123' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Registration successful',
    schema: {
      type: 'string',
      example: 'Success',
    },
  })
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('phone-register')
  @ApiOperation({ summary: 'Register user by phone number' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phone_number: { type: 'string', example: '1234567890' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Phone registration successful',
    schema: {
      type: 'string',
      example: 'Success',
    },
  })
  async phoneRegister(
    @Body()
    data: PhoneRegister,
  ) {
    return this.authService.phoneRegister(data);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('reset-password')
  @ApiOperation({ summary: 'Request password reset' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Password reset request successful',
    schema: {
      type: 'string',
      example: 'OK',
    },
  })
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body.email);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch('reset')
  @ApiOperation({ summary: 'Reset password with reset token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        new_pass: { type: 'string', example: 'newPassword123' },
        resetToken: { type: 'string', example: 'someResetToken' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Password reset successful',
    schema: {
      type: 'string',
      example: 'OK',
    },
  })
  async updatePassword(@Body() body: ResetPasswordType) {
    return this.authService.updatePassword(body);
  }

  // @UsePipes(new ValidationPipe())
  // @HttpCode(200)
  // @Post('update/email')
  // async updateEmail(@Body() body: ResetPasswordType) {
  //   return this.authService.updateEmail(body);
  // }
}
