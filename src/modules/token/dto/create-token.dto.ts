import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTokenDto {
  @ApiProperty({
    type: 'string',
    example: '4bc8ea00-2235-49d4-b548-9ba38c99e2c7',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  user_id: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({ enum: ['android', 'ios', 'web'], default: 'web' })
  @IsString()
  @IsEnum(['android', 'ios', 'web'])
  device_type: 'android' | 'ios' | 'web';
}
