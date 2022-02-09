import { RedisCacheService } from './../redis-cache/redis-cache.service';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import * as nodemailer from 'nodemailer';
import * as uuid from 'uuid';
import emailConfig from 'src/config/email.config';
import { ConfigType } from '@nestjs/config';
import { UserRepository } from 'src/repositories/user.repository';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;
  constructor(
    @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>,
    private userRepository: UserRepository,
    private redisCacheService: RedisCacheService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: this.config.service,
      port: this.config.port,
      host: this.config.service,
      auth: {
        user: this.config.user,
        pass: this.config.password,
      },
    });
  }

  async sendJoinEmail(email: string) {
    const existedEmail = await this.userRepository.findByUnique({ email });
    if (existedEmail) throw new HttpException('exist Email', 409);

    const signUpToken = uuid.v1();
    const mailOption: EmailOptions = {
      to: email,
      subject: '가입 인증 메일',
      html: `
        <h3>Don't Sleep Driver 가입 인증 코드입니다.</h3>
        <p>${signUpToken}</p>
      `,
    };

    //캐시가 이미 있는지 확인.
    const existedCache = await this.redisCacheService.getCache(email);
    if (existedCache === 'checked') return '이미 인증된 회원입니다.';
    try {
      await this.transporter.sendMail(mailOption);
      await this.redisCacheService.setCache(email, signUpToken, { ttl: 180 });
      return '이메일 전송 성공';
    } catch (err) {
      console.error(err);
      throw new HttpException('send Email Failed', 500);
    }
  }

  async checkTokenByEmail(email: string, token: string) {
    const existedToken = await this.redisCacheService.getCache(email);
    if (existedToken === token) {
      await this.redisCacheService.setCache(email, 'checked', { ttl: 600 });
      return '인증 성공';
    } else {
      throw new HttpException('check failed', 401);
    }
  }
}
