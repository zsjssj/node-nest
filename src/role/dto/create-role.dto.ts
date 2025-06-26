import { IsString, IsOptional, IsBoolean, Length, IsArray } from 'class-validator';
export class CreateRoleDto {
  @IsString()
  @Length(1, 50)
  name: string; //角色名称

  @IsString()
  @Length(1, 32)
  key: string; //角色的key

  @IsOptional()
  @IsString()
  @Length(0, 255)
  description?: string; //角色描述

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Length(0, 32, { each: true })
  permissions?: string[]; // 存储权限列表的 JSON 字符串

  @IsOptional()
  @IsBoolean()
  isActive?: boolean; // 是否启用角色

  @IsOptional()
  @IsBoolean()
  isSystem?: boolean; // 是否为系统角色，系统角色不能被删除或修改

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean; // 是否为管理员角色，管理员角色拥有最高权限

  @IsOptional()
  @IsBoolean()
  isSuperAdmin?: boolean; // 是否为超级管理员角色，超级管理员角色拥有所有权限

  @IsOptional()
  @IsBoolean()
  isGuest?: boolean; // 是否为访客角色，访客角色只能访问公共资源

  @IsOptional()
  @IsBoolean()
  isUser?: boolean; // 是否为普通用户角色，普通用户角色可以访问用户相关资源
}
