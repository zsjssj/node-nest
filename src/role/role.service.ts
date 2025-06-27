import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { generateRandomString } from '../common/utils/index';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    const roleData = new Role();
    const uid = generateRandomString(32); // 生成一个唯一的角色标识符
    roleData.uid = uid; // 设置角色的唯一标识符
    roleData.name = createRoleDto.name; // 设置角色名称
    roleData.key = createRoleDto.key; // 设置角色的key
    roleData.description = createRoleDto.description; // 设置角色描述
    roleData.permissions = createRoleDto.permissions ? JSON.stringify(createRoleDto.permissions) : undefined; // 设置权限列表
    return this.roleRepository.save(roleData);
  }

  findAll() {
    return this.roleRepository.find();
  }

  async findOne(id: string) {
    const role = await this.roleRepository.findOne({ where: { uid: id } }); // 使用 findOne 方法查找角色
    if (!role) {
      throw new NotFoundException(`未找到 ID 为 ${id} 的角色`);
    }
    if (role.permissions) {
      role.permissions = JSON.parse(role.permissions);
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne({ where: { uid: id } }); // 使用 findOne 方法查找角色
    if (!role) {
      throw new NotFoundException(`未找到 ID 为 ${id} 的角色`);
    }
    const roleData = new Role();
    roleData.id = role.id; // 保留原有角色 ID
    roleData.uid = id; // 设置角色 ID
    roleData.description = updateRoleDto.description; // 更新角色描述
    roleData.permissions = updateRoleDto.permissions ? JSON.stringify(updateRoleDto.permissions) : undefined; // 更新权限列表
    roleData.updatedAt = new Date(); // 更新角色的更新时间
    return this.roleRepository.save(roleData);
  }

  async remove(uid: string) {
    const result = await this.roleRepository.delete(uid);
    if (result.affected === 0) {
      throw new NotFoundException(`未找到 ID 为 ${uid} 的角色`);
    }
    return `已经删除 ID 为 ${uid} 的角色`;
  }
}
