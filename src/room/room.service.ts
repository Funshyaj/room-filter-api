import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { FilterUtil } from '../utilities/filter.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { Filter, Queries, Result, Sort } from './dto/interfaces';


@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private readonly roomRepository: Repository<Room>,
  ) { }

  async findAll({ page, limit, filters, sort }: Queries)
    : Promise<Result> {
    const paginationNumber = page || 0  // first page by default
    const paginationLimit = limit || 10 // limits the result by default

    const queryBuilder = this.roomRepository.createQueryBuilder('room');

    if (filters && filters.length > 0) {
      const parsedFilters: Filter[] = JSON.parse(filters)
      FilterUtil.filterBy(queryBuilder, parsedFilters, 'room')
    }

    if (sort && sort.length > 0) {
      const parsedSorts: Sort[] = JSON.parse(sort)
      FilterUtil.sortBy(queryBuilder, parsedSorts, 'room')
    }

    // Applying pagination
    FilterUtil.paginate(queryBuilder, paginationNumber, paginationLimit)
    const result = await queryBuilder.getMany();

    return {
      result,
      page: paginationNumber,
      limit: paginationLimit
    }
  }

  async findOne(id: number): Promise<Room> {
    const roomData =
      await this.roomRepository.findOneBy({ id });
    if (!roomData) {
      throw new HttpException(
        'Room Not Found',
        404,
      );
    }
    return roomData;
  }

  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    const roomData = this.roomRepository.create(createRoomDto);
    await this.roomRepository.save(roomData);
    return roomData
  }
}
