import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/generated/enums';

export const AdminOrEmployee = () =>
  SetMetadata('roles', [UserRole.admin, UserRole.employee]);
