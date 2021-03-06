import { AppController } from './app.controller';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import emailConfig from './config/email.config';
import redisConfig from './config/redis.config';
import { UserModule } from './user/user.module';
import jwtConfig from './config/jwt.config';
import { AuthModule } from './auth/auth.module';

import { DriverModule } from './driver/driver.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [emailConfig, redisConfig, jwtConfig],
      isGlobal: true,
    }),
    PrismaModule,
    EmailModule,
    RedisCacheModule,
    UserModule,
    AuthModule,
    DriverModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
