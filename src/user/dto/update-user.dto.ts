import { IsString, IsEmail, MinLength, IsOptional, IsBoolean, IsPhoneNumber, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: '用户名', required: false })
  @IsString()
  @MinLength(3)
  @IsOptional()
  username?: string;

  @ApiProperty({ description: '密码', required: false })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @ApiProperty({ description: '邮箱', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: '昵称', required: false })
  @IsString()
  @IsOptional()
  nickname?: string;

  @ApiProperty({ description: '手机号', required: false })
  @IsPhoneNumber('CN')
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: '是否激活', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
