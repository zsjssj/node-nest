import { PartialType } from '@nestjs/swagger';
import { CreateIceApiDto } from './create-ice-api.dto';

export class UpdateIceApiDto extends PartialType(CreateIceApiDto) {}
