import { IsString } from 'class-validator';

export class OauthLoginRequest {
  @IsString()
  token: string;
}
