import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsEnum } from 'class-validator';
import { UserRole } from '@prisma/generated/enums';

export class UpdateRoleDto {
  @ApiProperty({
    description: 'ID do utilizador',
    example: '42f4ab74-95e4-4748-b409-6b8610a8d182',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Nova role do utilizador',
    enum: UserRole,
    example: 'admin',
  })
  @IsEnum(UserRole)
  role: UserRole;
}
