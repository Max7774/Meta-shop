import { ApiProperty } from '@nestjs/swagger';

export class Address {
  @ApiProperty({
    description: 'Уникальный идентификатор адреса',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @ApiProperty({
    description: 'Дата создания',
    example: '2023-07-19T12:34:56.789Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Дата последнего обновления',
    example: '2023-07-20T09:12:34.789Z',
  })
  updatedAt: Date;

  @ApiProperty({ description: 'Город', example: 'Алматы' })
  town: string;

  @ApiProperty({ description: 'Улица', example: 'Абая' })
  street: string;

  @ApiProperty({ description: 'Номер дома', example: '15A' })
  house: string;

  @ApiProperty({
    description: 'Номер квартиры',
    example: '12',
    required: false,
  })
  apartment?: string;

  @ApiProperty({
    description: 'Код домофона',
    example: '1234',
    required: false,
  })
  intercom?: string;

  @ApiProperty({ description: 'Номер подъезда', example: '2', required: false })
  entrance?: string;

  @ApiProperty({ description: 'Этаж', example: '5', required: false })
  floor?: string;

  @ApiProperty({
    description: 'UUID пользователя',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  userUuid: string;
}
