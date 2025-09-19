import { Injectable } from '@nestjs/common';
import { CreateGsAppDto } from './dto/create-gs_app.dto';
import { UpdateGsAppDto } from './dto/update-gs_app.dto';

@Injectable()
export class GsAppService {
  create(createGsAppDto: CreateGsAppDto) {
    return 'This action adds a new gsApp';
  }

  findAll() {
    return `This action returns all gsApp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gsApp`;
  }

  update(id: number, updateGsAppDto: UpdateGsAppDto) {
    return `This action updates a #${id} gsApp`;
  }

  remove(id: number) {
    return `This action removes a #${id} gsApp`;
  }
}
