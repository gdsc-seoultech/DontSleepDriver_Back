import { OauthService } from './../oauth.service';
import { Req, HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { Request } from 'express';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private oauthService: OauthService) {
    super();
  }

  async validate(@Req() req: Request) {
    const { token } = req.body;

    const getKakaoUser = await this.oauthService.getKakaoUserInfo(token);
    const user = await this.oauthService.oauthLogin({
      ...getKakaoUser,
      provider: 'kakao',
    });

    return user;
  }
}
