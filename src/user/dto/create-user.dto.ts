import { IsInt, IsOptional, IsString, Max, Min, Length } from 'class-validator'

export class CreateUserDto {
  @IsOptional()
  @IsString()
  readonly nick_name: string
  @IsString()
  readonly user_name: string
  @IsString()
  @Length(5, 16)
  readonly password: string
  @IsOptional()
  @IsInt()
  @Max(150)
  @Min(0)
  readonly age?: number
}
