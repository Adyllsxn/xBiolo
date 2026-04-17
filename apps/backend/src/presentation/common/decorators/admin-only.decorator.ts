import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/generated/enums';

export const AdminOnly = () => SetMetadata('roles', [UserRole.admin]);
