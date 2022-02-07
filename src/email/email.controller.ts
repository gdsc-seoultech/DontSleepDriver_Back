import { EmailService } from './email.service';
import { EmailRequest } from './dto/email.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('/api/email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post()
  async sendEmail(@Body() data: EmailRequest) {
    const { email } = data;
    return this.emailService.sendJoinEmail(email);
  }

  @Post('/check')
  async checkToken(@Body() email: EmailRequest) {}
}
