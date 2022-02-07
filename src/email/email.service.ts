import { Inject, Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import * as nodemailer from 'nodemailer';
import * as uuid from 'uuid';
import emailConfig from 'src/config/email.config';
import { ConfigType } from '@nestjs/config';

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
    const signUpToken = uuid.v1();
    const mailOption: EmailOptions = {
      to: email,
      subject: '가입 인증 메일',
      html: `
        <h3>Don't Sleep Driver 가입 인증 코드입니다.</h3>
        <p>${signUpToken}</p>
      `,
    };
    await this.transporter.sendMail(mailOption);

    return '메일 전송 성공';
  }
}
