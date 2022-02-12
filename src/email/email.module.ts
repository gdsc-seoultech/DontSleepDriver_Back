import { RedisCacheService } from './../redis-cache/redis-cache.service';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
  imports: [RedisCacheModule],
  providers: [EmailService, UserRepository],
  controllers: [EmailController],
})
export class EmailModule {}
