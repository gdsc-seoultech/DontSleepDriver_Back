import { IsEmail, IsString } from 'class-validator';

export class SendEmailRequest {
  @IsEmail()
  email: string;
}

export class CheckTokenRequest {
  @IsEmail()
  email: string;

  @IsString()
  token: string;
}
