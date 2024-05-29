import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Queries } from './dto/interfaces';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @Get()
  findAll(@Query() queries: Queries) {
    return this.roomService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  @Post()
  createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto);
  }
}
