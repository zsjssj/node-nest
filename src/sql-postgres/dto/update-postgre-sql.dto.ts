import { PartialType } from '@nestjs/mapped-types';
import { CreatePostgreSqlDto } from './create-postgre-sql.dto';

export class UpdatePostgreSqlDto extends PartialType(CreatePostgreSqlDto) {}
