import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  //角色的唯一标识符，通常是一个字符串
  @Column({ type: 'varchar', length: 32, unique: true })
  uid: string;

  //创建时间
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  //更新时间
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  key: string; //角色的key

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  permissions?: string; // 存储权限列表的 JSON 字符串

  @Column({ type: 'boolean', default: true })
  isActive: boolean; // 是否启用角色

  @Column({ type: 'boolean', default: false })
  isSystem: boolean; // 是否为系统角色，系统角色不能被删除或修改

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean; // 是否为管理员角色，管理员角色拥有最高权限

  @Column({ type: 'boolean', default: false })
  isSuperAdmin: boolean; // 是否为超级管理员角色，超级管理员角色拥有所有权限

  @Column({ type: 'boolean', default: false })
  isGuest: boolean; // 是否为访客角色，访客角色只能访问公共资源

  @Column({ type: 'boolean', default: false })
  isUser: boolean; // 是否为普通用户角色，普通用户角色可以访问用户相关资源
}
