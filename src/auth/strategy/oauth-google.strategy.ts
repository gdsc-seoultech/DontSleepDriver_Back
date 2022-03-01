import { OauthService } from './../oauth.service';
import { Req, HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { Request } from 'express';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private oauthService: OauthService) {
    super();
  }

  async validate(@Req() req: Request) {
    const { token } = req.body;

    const getGoogleUser = await this.oauthService.getGoogleUserInfo(token);
    const user = await this.oauthService.oauthLogin({
      ...getGoogleUser,
      provider: 'google',
    });

    return user;
  }
}
