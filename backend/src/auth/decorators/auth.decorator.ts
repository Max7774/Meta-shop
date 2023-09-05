import { UseGuards, applyDecorators } from '@nestjs/common';
import { TypeRole } from '../auth.interface';
import { OnlyAdminGuard } from '../guards/admin.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';

export const Auth = (role: TypeRole) =>
  applyDecorators(
    role === 'ADMIN' || role === 'MANAGER'
      ? UseGuards(JwtAuthGuard, OnlyAdminGuard)
      : UseGuards(JwtAuthGuard),
  );
