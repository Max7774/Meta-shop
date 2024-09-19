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
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto, ResetPasswordDto } from './dto/refresh-token.dto';
import { ResetPasswordType } from './auth.interface';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  async login(@Body() dto: AuthDto) {
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
  async registerMail(@Param('token') token: string) {
    return this.authService.verifyToken(token);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('verify-token')
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token',
    required: true,
  })
  @ApiResponse({
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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        first_name: { type: 'string' },
        second_name: { type: 'string' },
        town: { type: 'string' },
        birth_day: { type: 'string' },
        phone_number: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiResponse({
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
  @Post('reset-password')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
      },
    },
  })
  @ApiResponse({
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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        new_pass: { type: 'string' },
        resetToken: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    schema: {
      type: 'string',
      example: 'OK',
    },
  })
  async updatePassword(@Body() body: ResetPasswordType) {
    return this.authService.updatePassword(body);
  }
}
