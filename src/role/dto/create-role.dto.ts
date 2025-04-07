import { IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '../../common/enums/permission.enum';

export class CreateRoleDto {
  @ApiProperty({ description: '角色名称' })
  @IsString()
  name: string;

  @ApiProperty({ description: '角色描述', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: '角色权限列表', enum: Permission, isArray: true })
  @IsArray()
  permissions: Permission[];

  @ApiProperty({ description: '是否激活', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
