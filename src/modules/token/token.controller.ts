import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { FilterTokenAllDto } from './dto/filter-token-all.dto';
import { ApiQuery } from '@nestjs/swagger';
import { DeviceType } from './entities/token.entity';
import { DeleteTokenDto } from './dto/delete-toke.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokensService: TokenService) {}

  @Post()
  create(@Body() dto: CreateTokenDto) {
    return this.tokensService.create(dto);
  }

  @Get()
  @ApiQuery({
    name: 'user_id',
    type: String,
    description: 'user ID',
    required: false,
  })
  @ApiQuery({
    name: 'device_type',
    type: String,
    enum: DeviceType,
    description: 'device type',
    required: false,
  })
  findAll(@Query() filter: FilterTokenAllDto) {
    return this.tokensService.findAll(filter);
  }

  @Delete('/:token_id')
  deleteById(@Param('token_id') token_id: string) {
    if (!token_id) {
      throw new BadRequestException("token_id didn't enter");
    }
    return this.tokensService.deleteById(token_id);
  }

  @Delete()
  delete(@Body() dto: DeleteTokenDto) {
    return this.tokensService.delete(dto);
  }
}
