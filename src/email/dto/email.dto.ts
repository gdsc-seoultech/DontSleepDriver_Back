import { IsEmail } from 'class-validator';

export class EmailRequest {
  @IsEmail()
  email: string;
}
