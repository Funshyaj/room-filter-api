import { Controller, Get, Param, Query } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @Get()
  findAll(@Query() filters) {
    return this.roomService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }
}
