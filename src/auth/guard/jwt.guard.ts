import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (authorization === undefined) {
      throw new HttpException('Token 전송 안됨', HttpStatus.UNAUTHORIZED);
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (info) {
      switch (info.name) {
        case 'TokenExpiredError':
          throw new HttpException('기간 만료', HttpStatus.UNAUTHORIZED);
        case 'JsonWebTokenError':
          throw new HttpException('token 값 에러', HttpStatus.BAD_REQUEST);
      }
    }
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
