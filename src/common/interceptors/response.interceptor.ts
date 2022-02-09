import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //before는 거의 미들웨어가 처리해줌.
    return next.handle().pipe(
      map((response: unknown) => {
        if (typeof response === 'string') {
          return {
            message: response,
          };
        } else {
          return {
            data: response,
          };
        }
      }),
    );
  }
}
