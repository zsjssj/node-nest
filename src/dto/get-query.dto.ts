import { IsInt, IsOptional, Min } from 'class-validator'

export class GetTestQueryDto {
  @IsInt()
  @Min(1)
  data: number

  @IsInt()
  @IsOptional()
  length?: number = 1 // 默认值为1
}
