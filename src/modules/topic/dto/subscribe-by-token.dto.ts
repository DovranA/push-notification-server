import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class SubscribeByTokenDto {
  @ApiProperty({
    type: 'string',
    example: '4bc8ea00-2235-49d4-b548-9ba38c99e2c7',
  })
  @IsOptional()
  @IsString()
  @IsUUID('4')
  user_id?: string;

  @ApiProperty({})
  @IsOptional()
  @IsString()
  token?: string;
}
