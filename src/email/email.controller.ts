import { ResponseDto } from './../common/dto/response.dto';
import { EmailService } from './email.service';
import { CheckTokenRequest, SendEmailRequest } from './dto/email.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('/api/email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post()
  async sendEmail(@Body() data: SendEmailRequest): Promise<ResponseDto<[]>> {
    const { email } = data;
    const sendMailStatus: string = await this.emailService.sendJoinEmail(email);
    if (sendMailStatus === 'success') return ResponseDto.OK('메일 전송성공');
    else return ResponseDto.OK(sendMailStatus);
  }

  @Post('/check')
  async checkToken(@Body() data: CheckTokenRequest): Promise<ResponseDto<[]>> {
    const { token, email } = data;
    await this.emailService.checkTokenByEmail(email, token);
    return ResponseDto.OK('인증 성공');
  }
}
