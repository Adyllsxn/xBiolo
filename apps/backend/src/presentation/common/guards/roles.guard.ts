import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/generated/enums';
import { Request } from 'express';
import type { AuthenticatedUser } from 'src/core/types/authenticated-user.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = (request as Request & { user?: AuthenticatedUser }).user;

    if (!user) {
      throw new ForbiddenException('Acesso negado');
    }

    const hasRole = requiredRoles.some((role) => user.role === role);

    if (!hasRole) {
      throw new ForbiddenException('Acesso negado');
    }

    return true;
  }
}
