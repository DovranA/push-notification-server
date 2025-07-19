import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token.entity';
import { Repository } from 'typeorm';
import { CreateTokenDto } from './dto/create-token.dto';
import { FilterTokenAllDto } from './dto/filter-token-all.dto';
import { DeleteTokenDto } from './dto/delete-toke.dto';

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
  public async findAll(filter: FilterTokenAllDto) {
    return await this.tokenRepository.find({ where: filter });
  }
  async userToken(user_id: string): Promise<TokenEntity[]> {
    return await this.tokenRepository.find({ where: { user_id } });
  }

  public async deleteById(token_id: string) {
    return await this.tokenRepository.delete({ id: token_id });
  }

  public async delete(dto: DeleteTokenDto) {
    const { token, user_id } = dto;

    if (user_id) {
      const result = await this.tokenRepository.delete({ user_id });
      if (result.affected === 0) {
        throw new NotFoundException('token not found');
      }
      return result;
    } else if (token) {
      const result = await this.tokenRepository.delete({ token });
      if (result.affected === 0) {
        throw new NotFoundException('token not found');
      }
    } else {
      throw new BadRequestException("user_id or token didn't enter");
    }
  }
}
