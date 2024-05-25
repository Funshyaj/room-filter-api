import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomService {
  // findAll(pageNumber, limit) {
  findAll(filters) {
    return filters
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }
}

// import { Injectable, NotFoundException } from '@nestjs/common';
// // import { FilterUtil, Filter } from './filter.util';
// // import { PaginationDto } from './pagination.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { EntityRepository } from 'typeorm';

// @Injectable()
// // export class BaseService<T> {
// export class RoomService {
//   constructor(
//     @InjectRepository(EntityRepository)
//     private readonly repository: EntityRepository<T>,
//   ) { }

//   async findAll(
//     filters: Filter[],
//     // pagination: PaginationDto,
//     // sort?: { field: string; order: 'ASC' | 'DESC' }[],
//   ) {
//     // const qb = this.repository.createQueryBuilder('entity');
//     // const { page, limit } = pagination;
//     // FilterUtil.filterBy(qb, filters);
//     // FilterUtil.sortBy(qb, sort || []);
//     // FilterUtil.paginate(qb, page, limit);

//     // const data = await qb.getMany();
//     // if (!data.length) {
//     //   throw new NotFoundException('No records found');
//     // }
//     return 'works';
//   }

//   findOne(id: number) {
//     //     return `This action returns a #${id} room`;
//     //   }
// }
// }