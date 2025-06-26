import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { generateRandomString } from '../common/utils/index';

@Injectable()
export class RoleService {
  // constructor(
  //   @InjectRepository(Role)
  //   private roleRepository: Repository<Role>,
  // ) {}
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
    console.log('roleData', roleData);

    return this.roleRepository.save(roleData);
    // return `This action returns all role`;
  }

  findAll() {
    return this.roleRepository.find();
    // return `This action returns all role`;
  }

  async findOne(id: number) {
    // 使用 findOne 方法查找角色
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`未找到 ID 为 ${id} 的角色`);
    }
    if (role.permissions) {
      role.permissions = JSON.parse(role.permissions);
    }
    return role;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
