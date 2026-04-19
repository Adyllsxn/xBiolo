import { Injectable, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';

@Injectable()
export class RateLimitGuard extends ThrottlerGuard {
  protected async throwThrottlingException(context: ExecutionContext): Promise<void> {
    const request = context.switchToHttp().getRequest<Request>();
    const email = request.body?.email || 'desconhecido';
    const ip = request.ip || request.socket?.remoteAddress || 'desconhecido';

    // Log para auditoria
    console.log(`🚨 RATE LIMIT EXCEEDED: Email: ${email}, IP: ${ip}, Time: ${new Date().toISOString()}`);

    throw new HttpException(
      {
        statusCode: 429,
        message: 'Muitas tentativas de login. Aguarde 2 minutos antes de tentar novamente.',
        error: 'Too Many Requests',
        timestamp: new Date().toISOString(),
        path: request.url,
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }

  protected async getTracker(req: Request): Promise<string> {
    // Usa o email como tracker (mais eficaz que IP)
    const email = req.body?.email;
    if (email && typeof email === 'string') {
      return `email:${email}`;
    }
    // Fallback para IP
    return `ip:${req.ip || req.socket?.remoteAddress || 'unknown'}`;
  }
}