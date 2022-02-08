import { ConfigService } from '@nestjs/config';
import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { RedisCacheService } from './redis-cache.service';
import type { ClientOpts as RedisClientOpts } from 'redis';

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOpts>({
      useFactory: async (config: ConfigService) => ({
        store: redisStore,
        host: config.get('redis.url'),
        port: config.get('redis.port'),
        ttl: 600,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
