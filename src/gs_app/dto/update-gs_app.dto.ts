import { PartialType } from '@nestjs/swagger';
import { CreateGsAppDto } from './create-gs_app.dto';

export class UpdateGsAppDto extends PartialType(CreateGsAppDto) {}
