import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception.getStatus();
      const error = exception.getResponse() as
        | string
        | { error: string; statusCode: number; message: string | string[] };
      if (typeof error === 'string' || 'object') {
        response.status(status).send({
          success: false,
          timestamp: new Date().toISOString(),
          statusCode: status,
          path: request.url,
          error,
        });
      } else {
        response.status(error.statusCode).send({
          success: false,
          timestamp: new Date().toISOString(),
          ...error,
        });
      }
    }
  }
  