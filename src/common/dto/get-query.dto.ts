import { IsInt, IsOptional, Min } from 'class-validator'

export class GetTestQueryDto {
  @IsInt()
  @Min(1)
  readonly data: number

  @IsInt()
  @IsOptional()
  readonly length?: number = 1
}
