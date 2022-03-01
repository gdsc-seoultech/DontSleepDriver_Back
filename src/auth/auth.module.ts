import { GoogleStrategy } from './strategy/oauth-google.strategy';
import { OauthNaverGuard } from './guard/oauth-naver.guard';
import { OauthKakaoGuard } from './guard/oauth-kakao.guard';
import { LocalAuthGuard } from './guard/local.guard';
import { JwtAuthGuard } from './guard/jwt.guard';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserRepository } from 'src/repositories/user.repository';
import { LocalStrategy } from './strategy/local.strategy';
import { KakaoStrategy } from './strategy/oauth-kakao.strategy';
import { OauthService } from './oauth.service';
import { NaverStrategy } from './strategy/oauth-naver.startegy';
import { OauthGoogleGuard } from './guard/oauth-google.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get('jwt.secret'),
        signOptions: {
          expiresIn: config.get('jwt.expires'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    OauthService,
    JwtAuthGuard,
    JwtStrategy,
    UserRepository,
    LocalAuthGuard,
    LocalStrategy,
    KakaoStrategy,
    NaverStrategy,
    GoogleStrategy,
    OauthGoogleGuard,
    OauthNaverGuard,
    OauthKakaoGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
