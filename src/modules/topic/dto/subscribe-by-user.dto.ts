import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SubscribeByUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_id: string;
}
