import {
  Body,
  Controller,
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
import { AccessTokenDto, RefreshTokenDto } from './dto/refresh-token.dto';
import { ResetPasswordType } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login/access-token')
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
  async registerMail(@Param('token') token: string) {
    return this.authService.verifyToken(token);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('verify-token')
  async checkToken(@Body() dto: AccessTokenDto) {
    return await this.authService.verifyAccessToken(dto.accessToken);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('reset-password')
  async resetPassword(@Body() body: { email: string }) {
    return this.authService.resetPassword(body.email);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch('reset')
  async updatePassword(@Body() body: ResetPasswordType) {
    return this.authService.updatePassword(body);
  }
}
