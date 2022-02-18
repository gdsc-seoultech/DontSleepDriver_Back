import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] };
    if (typeof error === 'string' || 'object') {
      response.status(status).send({
        success: false,
        statusCode: status,
        error: typeof error === 'string' ? error : error.message,
      });
    } else {
      response.status(error.statusCode).send({
        success: false,
        statusCode: error.statusCode,
        error: error.message,
      });
    }
  }
}
