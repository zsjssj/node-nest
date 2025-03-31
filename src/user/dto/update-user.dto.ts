import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  readonly name: string
  @IsNumber()
  readonly age: number
  @IsString()
  readonly id: number
  @IsDate()
  readonly createTime: Date
  @IsDate()
  readonly updateTime: Date
  @IsBoolean()
  readonly isDelete: boolean
}
