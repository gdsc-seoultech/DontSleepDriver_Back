import { EmailService } from './email.service';
import { CheckTokenRequest, SendEmailRequest } from './dto/email.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('/api/email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post()
  async sendEmail(@Body() data: SendEmailRequest) {
    const { email } = data;
    return this.emailService.sendJoinEmail(email);
  }

  @Post('/check')
  async checkToken(@Body() data: CheckTokenRequest) {
    const { token, email } = data;
    return this.emailService.checkTokenByEmail(email, token);
  }
}
