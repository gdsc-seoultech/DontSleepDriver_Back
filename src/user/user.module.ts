import { RedisCacheModule } from './../redis-cache/redis-cache.module';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
  imports: [RedisCacheModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
