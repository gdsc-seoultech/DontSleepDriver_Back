import { AuthService } from './../auth.service';
import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: false,
    });
  }

  async validate(email: string, password: string) {
    console.log(email, password);
    const user = await this.authService.validateUser({ email, password });
    if (!user) {
      throw new HttpException('이메일과 패스워드를 확인해주세요', 400);
    }
    return user;
  }
}
