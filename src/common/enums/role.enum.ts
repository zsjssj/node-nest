import { Permission } from './permission.enum';

export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

// 角色权限映射
export const RolePermissions: Record<Role, Permission[]> = {
  [Role.SUPER_ADMIN]: Object.values(Permission),
  [Role.ADMIN]: [Permission.USER_CREATE, Permission.USER_READ, Permission.USER_UPDATE, Permission.USER_DELETE, Permission.ROLE_READ, Permission.SYSTEM_LOG, Permission.FILE_UPLOAD, Permission.FILE_DOWNLOAD],
  [Role.USER]: [Permission.USER_READ, Permission.FILE_UPLOAD, Permission.FILE_DOWNLOAD],
  [Role.GUEST]: [Permission.USER_READ],
};
