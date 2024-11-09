import { EnumTypeOfClaim } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateClaimDto {
  @IsString()
  email: string;

  @IsString()
  text: string;

  @IsEnum(EnumTypeOfClaim)
  type: EnumTypeOfClaim;

  @IsOptional()
  @IsString()
  phone: string;
}
