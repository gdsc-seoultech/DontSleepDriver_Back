import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCache(key: string): Promise<string> {
    console.log('method getCache ', key);
    return await this.cacheManager.get(key);
  }

  async setCache(
    key: string,
    value: string,
    option?: CachingConfig,
  ): Promise<string> {
    console.log('method setCache ', key, value, option);

    return await this.cacheManager.set(key, value, option);
  }

  async delCache(key: string): Promise<string> {
    return await this.cacheManager.del(key);
  }
}
