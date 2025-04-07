import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '../enums/permission.enum';
import { Role } from '../enums/role.enum';
import { RolePermissions } from '../enums/role.enum';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<Permission[]>('permissions', context.getHandler());
    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // 如果是创建用户的请求，允许访问
    if (!user && request.path === '/user/create' && request.method === 'POST') {
      return true;
    }

    if (!user) {
      return false;
    }

    const userRole = user.role as Role;
    const userPermissions = RolePermissions[userRole];

    return requiredPermissions.every((permission) => userPermissions.includes(permission));
  }
}
