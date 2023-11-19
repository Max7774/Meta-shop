import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}

export class AccessTokenDto {
  @IsString()
  accessToken: string;
}
