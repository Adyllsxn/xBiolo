import { IUserRole, IRoleListResponse } from '../types/permission.type';
import { UpdateRoleDto } from 'src/presentation/modules/identity/permission/dto/update-role.dto';

export interface IPermissionService {
  listRoles(): Promise<IRoleListResponse>;
  getUserRole(id: string): Promise<IUserRole>;
  updateUserRole(
    updateRoleDto: UpdateRoleDto,
    updatedById: string,
  ): Promise<{ message: string; user: IUserRole }>;
}
