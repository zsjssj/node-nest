import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PermissionGuard } from '../common/guards/permission.guard';
import { RequirePermissions } from '../common/decorators/permissions.decorator';
import { Permission } from '../common/enums/permission.enum';

@ApiTags('角色管理')
@ApiBearerAuth()
@Controller('role')
@UseGuards(PermissionGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({ summary: '创建角色' })
  @ApiResponse({ status: 201, description: '角色创建成功' })
  @RequirePermissions(Permission.ROLE_CREATE)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有角色' })
  @ApiResponse({ status: 200, description: '获取角色列表成功' })
  @RequirePermissions(Permission.ROLE_READ)
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取指定角色' })
  @ApiResponse({ status: 200, description: '获取角色信息成功' })
  @RequirePermissions(Permission.ROLE_READ)
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新角色信息' })
  @ApiResponse({ status: 200, description: '更新角色信息成功' })
  @RequirePermissions(Permission.ROLE_UPDATE)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除角色' })
  @ApiResponse({ status: 200, description: '删除角色成功' })
  @RequirePermissions(Permission.ROLE_DELETE)
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }

  @Post(':id/permissions')
  @ApiOperation({ summary: '分配角色权限' })
  @ApiResponse({ status: 200, description: '分配权限成功' })
  @RequirePermissions(Permission.ROLE_UPDATE)
  assignPermissions(@Param('id') id: string, @Body() permissions: Permission[]) {
    return this.roleService.assignPermissions(id, permissions);
  }
}
