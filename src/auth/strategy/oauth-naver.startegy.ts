import { OauthService } from './../oauth.service';
import { Req, HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { Request } from 'express';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(private oauthService: OauthService) {
    super();
  }

  async validate(@Req() req: Request) {
    const { token } = req.body;

    const getNaverUser = await this.oauthService.getNaverUserInfo(token);
    const user = await this.oauthService.oauthLogin({
      ...getNaverUser,
      provider: 'naver',
    });

    return user;
  }
}
