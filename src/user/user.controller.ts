import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PermissionGuard } from '../common/guards/permission.guard';
import { RequirePermissions } from '../common/decorators/permissions.decorator';
import { Permission } from '../common/enums/permission.enum';

@ApiTags('用户管理')
@ApiBearerAuth()
@Controller('user')
@UseGuards(PermissionGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({ summary: '创建用户' })
  @ApiResponse({ status: 201, description: '用户创建成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 409, description: '用户名/邮箱/手机号已存在' })
  @RequirePermissions(Permission.USER_CREATE)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有用户' })
  @ApiResponse({ status: 200, description: '获取用户列表成功' })
  @ApiResponse({ status: 400, description: '获取用户列表失败' })
  @RequirePermissions(Permission.USER_READ)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取指定用户' })
  @ApiResponse({ status: 200, description: '获取用户信息成功' })
  @ApiResponse({ status: 400, description: '无效的用户ID' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @RequirePermissions(Permission.USER_READ)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新用户信息' })
  @ApiResponse({ status: 200, description: '更新用户信息成功' })
  @ApiResponse({ status: 400, description: '无效的用户ID' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @ApiResponse({ status: 409, description: '邮箱/手机号已被使用' })
  @RequirePermissions(Permission.USER_UPDATE)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiResponse({ status: 200, description: '删除用户成功' })
  @ApiResponse({ status: 400, description: '无效的用户ID或删除失败' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @RequirePermissions(Permission.USER_DELETE)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Get('captcha')
  @ApiOperation({ summary: '获取验证码' })
  @ApiResponse({ status: 200, description: '获取验证码成功' })
  @ApiResponse({ status: 400, description: '生成验证码失败' })
  getCaptcha() {
    return this.userService.createCode();
  }

  @Post(':id/roles/:roleId')
  @ApiOperation({ summary: '为用户分配角色' })
  @ApiResponse({ status: 200, description: '分配角色成功' })
  @RequirePermissions(Permission.USER_UPDATE)
  assignRole(@Param('id') id: string, @Param('roleId') roleId: string) {
    return this.userService.assignRole(id, roleId);
  }

  @Delete(':id/roles/:roleId')
  @ApiOperation({ summary: '移除用户的角色' })
  @ApiResponse({ status: 200, description: '移除角色成功' })
  @RequirePermissions(Permission.USER_UPDATE)
  removeRole(@Param('id') id: string, @Param('roleId') roleId: string) {
    return this.userService.removeRole(id, roleId);
  }

  @Get(':id/roles')
  @ApiOperation({ summary: '获取用户的所有角色' })
  @ApiResponse({ status: 200, description: '获取用户角色列表成功' })
  @RequirePermissions(Permission.USER_READ)
  getUserRoles(@Param('id') id: string) {
    return this.userService.getUserRoles(id);
  }
}
