import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

// Tipo para erro do Prisma
interface PrismaError {
  code: string;
  meta?: { target?: string };
  message: string;
}

// Tipo para resposta de erro do HttpException
interface HttpExceptionResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';

    // Erros do Prisma (identifica pelo código)
    const prismaError = exception as PrismaError;
    if (prismaError && typeof prismaError.code === 'string') {
      switch (prismaError.code) {
        case 'P2002':
          status = HttpStatus.CONFLICT;
          message = `Já existe um registro com este ${prismaError.meta?.target}`;
          error = 'Conflito';
          break;
        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          message = 'Registro não encontrado';
          error = 'Not Found';
          break;
        case 'P2003':
          status = HttpStatus.BAD_REQUEST;
          message = 'Este registro está relacionado a outros dados';
          error = 'Bad Request';
          break;
        default:
          message = prismaError.message;
      }
    }

    // Erros do NestJS (HttpException)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse =
        exception.getResponse() as HttpExceptionResponse;

      // Trata message que pode ser string ou array
      if (typeof exceptionResponse.message === 'string') {
        message = exceptionResponse.message;
      } else if (Array.isArray(exceptionResponse.message)) {
        message = exceptionResponse.message.join(', ');
      } else {
        message = exception.message;
      }

      error = exceptionResponse.error || exception.name;
    }

    // Erros genéricos
    if (exception instanceof Error && !(exception instanceof HttpException)) {
      message = exception.message;
      this.logger.error(exception.stack);
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      error: error,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
