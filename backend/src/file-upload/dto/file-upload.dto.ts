import { IsNumber, IsString } from 'class-validator';

export class FileUpload {
  @IsString()
  uuid: string;

  @IsString()
  filename: string;

  @IsString()
  originalName: string;

  @IsNumber()
  size: number;

  @IsString()
  mimetype: string;
}
