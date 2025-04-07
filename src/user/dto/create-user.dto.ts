import { IsString, IsEmail, MinLength, IsOptional, Matches, IsPhoneNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../common/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsString()
  @MinLength(3)
  @Matches(/^[a-zA-Z0-9_-]+$/, { message: '用户名只能包含字母、数字、下划线和连字符' })
  username!: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
    message: '密码必须包含大小写字母和数字',
  })
  password!: string;

  @ApiProperty({ description: '邮箱', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: '昵称', required: false })
  @IsString()
  @IsOptional()
  @Matches(/^[\u4e00-\u9fa5a-zA-Z0-9_-]+$/, { message: '昵称只能包含中文、字母、数字、下划线和连字符' })
  nickname?: string;

  @ApiProperty({ description: '手机号', required: false })
  @IsPhoneNumber('CN')
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: '角色', enum: Role, default: Role.USER })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
