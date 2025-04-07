import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';
import { RoleService } from '../role/role.service';
import * as svgCaptcha from 'svg-captcha';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    private roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      console.log('开始创建用户，接收到的数据：', createUserDto);

      // 检查用户名是否已存在
      const existingUserByUsername = await this.userRepository.findOne({
        where: { username: createUserDto.username },
      });

      if (existingUserByUsername) {
        console.log('用户名已存在：', createUserDto.username);
        throw new ConflictException(`用户名 ${createUserDto.username} 已存在`);
      }

      // 检查邮箱是否已存在
      if (createUserDto.email) {
        const existingUserByEmail = await this.userRepository.findOne({
          where: { email: createUserDto.email },
        });

        if (existingUserByEmail) {
          throw new ConflictException(`邮箱 ${createUserDto.email} 已被使用`);
        }
      }

      // 检查手机号是否已存在
      if (createUserDto.phone) {
        const existingUserByPhone = await this.userRepository.findOne({
          where: { phone: createUserDto.phone },
        });

        if (existingUserByPhone) {
          throw new ConflictException(`手机号 ${createUserDto.phone} 已被使用`);
        }
      }

      const { password, ...rest } = createUserDto;

      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
          ...rest,
          password: hashedPassword,
        });

        const savedUser = await this.userRepository.save(user);
        const { password: _, ...result } = savedUser;
        return result;
      } catch (err) {
        console.error('创建用户时发生错误：', err);
        throw new BadRequestException('创建用户失败：' + err.message);
      }
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('创建用户时发生未知错误：', error);
      throw new BadRequestException('创建用户失败：发生未知错误');
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find({
        select: ['id', 'username', 'email', 'nickname', 'phone', 'isActive', 'role', 'createdAt', 'updatedAt'],
      });
    } catch (error) {
      throw new BadRequestException('获取用户列表失败');
    }
  }

  async findOne(id: string) {
    if (!id || id.length !== 16) {
      throw new BadRequestException('无效的用户ID');
    }

    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'username', 'email', 'nickname', 'phone', 'isActive', 'role', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      throw new NotFoundException(`用户ID ${id} 不存在`);
    }

    return user;
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!id || id.length !== 16) {
      throw new BadRequestException('无效的用户ID');
    }

    const user = await this.findOne(id);

    // 检查邮箱是否被其他用户使用
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUserByEmail = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (existingUserByEmail) {
        throw new ConflictException(`邮箱 ${updateUserDto.email} 已被使用`);
      }
    }

    // 检查手机号是否被其他用户使用
    if (updateUserDto.phone && updateUserDto.phone !== user.phone) {
      const existingUserByPhone = await this.userRepository.findOne({
        where: { phone: updateUserDto.phone },
      });

      if (existingUserByPhone) {
        throw new ConflictException(`手机号 ${updateUserDto.phone} 已被使用`);
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    if (!id || id.length !== 16) {
      throw new BadRequestException('无效的用户ID');
    }

    const user = await this.findOne(id);
    try {
      return await this.userRepository.remove(user);
    } catch (error) {
      throw new BadRequestException('删除用户失败');
    }
  }

  async assignRole(userId: string, roleId: string) {
    const user = await this.findOne(userId);
    const role = await this.roleService.findOne(roleId);

    // 检查是否已经存在该角色
    const existingUserRole = await this.userRoleRepository.findOne({
      where: {
        userId: user.id,
        roleId: role.id,
      },
    });

    if (existingUserRole) {
      throw new ConflictException('用户已经拥有该角色');
    }

    // 创建新的用户角色关联
    const userRole = this.userRoleRepository.create({
      user,
      role,
    });

    return this.userRoleRepository.save(userRole);
  }

  async removeRole(userId: string, roleId: string) {
    const userRole = await this.userRoleRepository.findOne({
      where: {
        userId,
        roleId,
      },
    });

    if (!userRole) {
      throw new NotFoundException('用户没有该角色');
    }

    return this.userRoleRepository.remove(userRole);
  }

  async getUserRoles(userId: string) {
    const userRoles = await this.userRoleRepository.find({
      where: { userId },
      relations: ['role'],
    });

    return userRoles.map((userRole) => userRole.role);
  }

  //创建验证码
  createCode() {
    try {
      const captcha = svgCaptcha.create({
        size: 4,
        ignoreChars: '0o1i',
        noise: 2,
        color: true,
        fontSize: 50,
        width: 100,
        height: 40,
        background: '#cc9966',
      });
      return captcha;
    } catch (error) {
      throw new BadRequestException('生成验证码失败');
    }
  }
}
