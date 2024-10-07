import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { TypeRole } from '../auth.interface';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';

export const Auth = (roles: TypeRole[]) =>
  applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
