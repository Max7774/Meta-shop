import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth(['DEFAULT_USER', 'MANAGER', 'ADMIN', 'COMPANY'])
  @Get('profile')
  async getProfile(@CurrentUser('uuid') uuid: string) {
    return this.userService.byId(uuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth(['DEFAULT_USER', 'MANAGER', 'ADMIN', 'COMPANY'])
  @Put('profile')
  async updateProfile(@CurrentUser('uuid') uuid: string, @Body() dto: UserDto) {
    return this.userService.updateProfile(uuid, dto);
  }

  @HttpCode(200)
  @Auth(['DEFAULT_USER', 'MANAGER', 'ADMIN', 'COMPANY'])
  @Patch('profile/favorites/:productUuid')
  async toggleFavorites(
    @CurrentUser('uuid') uuid: string,
    @Param('productUuid') productUuid: string,
  ) {
    return this.userService.toggleFavorite(uuid, productUuid);
  }

  @HttpCode(200)
  @Auth(['ADMIN'])
  @Get('all')
  async getAll() {
    return this.userService.getAll();
  }

  @HttpCode(200)
  @Auth(['ADMIN'])
  @Delete(':uuid')
  async deleteUser(@Param('uuid') uuid: string) {
    return this.userService.deleteUser(uuid);
  }
}
