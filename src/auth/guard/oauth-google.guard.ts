import {
  Injectable,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OauthGoogleGuard extends AuthGuard('google') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { token } = request.body;
    if (!token) {
      throw new HttpException('잘못된 요청입니다.', HttpStatus.UNAUTHORIZED);
    }
    return super.canActivate(context);
  }
}
