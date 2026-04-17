import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { IPermissionService } from 'src/core/interfaces/permissionService.interface';
import { IUserRole, IRoleListResponse } from 'src/core/types/permission.type';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UserRole } from '@prisma/generated/enums';

@Injectable()
export class PermissionService implements IPermissionService {
  constructor(private readonly prismaService: PrismaService) {}

  // Adicionado async para corresponder à interface
  async listRoles(): Promise<IRoleListResponse> {
    const roles = Object.values(UserRole);

    const description: Record<UserRole, string> = {
      [UserRole.admin]: 'Administrador com acesso total ao sistema',
      [UserRole.employee]: 'Funcionário com acesso limitado ao sistema',
    };

    return {
      roles,
      description,
      total: roles.length,
    };
  }

  async getUserRole(id: string): Promise<IUserRole> {
    const user = await this.prismaService.user.findFirst({
      where: { id, deletedAt: null },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Utilizador com ID "${id}" não encontrado`);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async updateUserRole(
    updateRoleDto: UpdateRoleDto,
    updatedById: string,
  ): Promise<{ message: string; user: IUserRole }> {
    const { userId, role } = updateRoleDto;

    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(
        `Utilizador com ID "${userId}" não encontrado`,
      );
    }

    if (user.deletedAt !== null) {
      throw new BadRequestException(
        'Não é possível alterar role de um utilizador deletado',
      );
    }

    console.log(
      `🔐 ROLE CHANGE: User ${user.email} (${userId}) - Old: ${user.role} -> New: ${role} at ${new Date().toISOString()}`,
    );

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        role,
        // updatedById removido - campo não existe no schema
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return {
      message: `Role alterada com sucesso ✅`,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    };
  }
}