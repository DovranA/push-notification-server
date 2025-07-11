import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token.entity';
import { Repository } from 'typeorm';
import { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}
  async create(dto: CreateTokenDto): Promise<TokenEntity> {
    const saveToken = this.tokenRepository.create(dto);
    try {
      return await this.tokenRepository.save(saveToken);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Token already exists');
      }
      throw new BadRequestException('error');
    }
  }
  async userToken(user_id: string): Promise<TokenEntity[]> {
    return await this.tokenRepository.find({ where: { user_id } });
  }
}
