import { IsOptional, IsString, IsNumber, Length } from 'class-validator';

export class CreatePostgreSqlDto {
  @IsNumber()
  lng: number;

  @IsNumber()
  lat: number;

  @IsString()
  @Length(1, 255)
  title: string;

  @IsOptional()
  info?: string;
}
