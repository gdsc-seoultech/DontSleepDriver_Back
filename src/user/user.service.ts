import { RedisCacheService } from './../redis-cache/redis-cache.service';
import { Injectable, HttpException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateUserRequest } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private redisCacheService: RedisCacheService,
  ) {}

  async signUp(data: CreateUserRequest): Promise<void> {
    //이메일 인증 회원인지 확인
    const { email, password } = data;
    const checkedEmail = await this.redisCacheService.getCache(email);
    if (checkedEmail !== 'checked')
      throw new HttpException('인증된 이메일이 아닙니다', 401);

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await this.userRepository.create({
        ...data,
        password: hashedPassword,
        provider: 'local',
      });
      const cachedEmail = await this.redisCacheService.getCache(email);
      if (cachedEmail) await this.redisCacheService.delCache(email);
    } catch (err) {
      console.log(err);
      throw new HttpException('database Error', 500);
    }
  }
}
