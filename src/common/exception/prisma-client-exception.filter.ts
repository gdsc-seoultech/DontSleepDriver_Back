import { Prisma } from '.prisma/client';
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log(exception);
    switch (exception.code) {
      case 'P2000':
        this.catchValueTooLong(exception, response);
        break;
      case 'P2002':
        this.catchUniqueConstraint(exception, response);
        break;
      case 'P2025':
        this.catchNotFound(exception, response);
        break;
      default:
        this.unhandledException(exception, host);
        break;
    }
  }

  /*
   catch P2000 => The provided value for the column is too long for the column's type. Column:
   return badRequest 400
   */
  catchValueTooLong(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ) {
    const status = HttpStatus.BAD_REQUEST;
    response.status(status).send({
      success: false,
      statusCode: status,
      error: this.cleanUpException(exception),
    });
  }

  /*
    catch P2002 -> unique Constraint
    return 409 Conflict
     */
  catchUniqueConstraint(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ) {
    const status = HttpStatus.CONFLICT;
    response.status(status).send({
      success: false,
      statusCode: status,
      error: this.cleanUpException(exception),
    });
  }

  /*
    catch P2025 -> 
    return 404 Not Fount
    */

  catchNotFound(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ) {
    const status = HttpStatus.NOT_FOUND;
    response.status(status).json({
      success: false,
      statusCode: status,
      error: this.cleanUpException(exception),
    });
  }

  unhandledException(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    // default 500 error code
    super.catch(exception, host);
  }

  cleanUpException(exception: Prisma.PrismaClientKnownRequestError): string {
    return exception.message.replace(/\n/g, '');
  }
}
