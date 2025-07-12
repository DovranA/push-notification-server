import { Body, Controller, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokensService: TokenService) {}

  @Post()
  create(@Body() dto: CreateTokenDto) {
    return this.tokensService.create(dto);
  }
}
