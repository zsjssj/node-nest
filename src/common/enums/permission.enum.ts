export enum Permission {
  // 用户管理权限
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',

  // 角色管理权限
  ROLE_CREATE = 'role:create',
  ROLE_READ = 'role:read',
  ROLE_UPDATE = 'role:update',
  ROLE_DELETE = 'role:delete',

  // 系统管理权限
  SYSTEM_CONFIG = 'system:config',
  SYSTEM_LOG = 'system:log',

  // 其他权限
  FILE_UPLOAD = 'file:upload',
  FILE_DOWNLOAD = 'file:download',
}
