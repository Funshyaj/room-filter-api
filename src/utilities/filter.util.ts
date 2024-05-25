// import { Injectable } from '@nestjs/common';
// import { Criteria, Filter, QueryBuilder, WhereConditions } from 'typeorm';

// @Injectable()
// export class FilterUtil {
//   static paginate(qb: QueryBuilder<any>, page: number, limit: number) {
//     return qb.skip(page * limit).take(limit);
//   }

//   static filterBy(qb: QueryBuilder<any>, filters: Filter[]): QueryBuilder<any> {
//     const conditions: WhereConditions = filters.reduce((prev, filter) => {
//       const { field, operator, value } = filter;
//       switch (operator) {
//         case 'equals':
//           prev[field] = value;
//           break;
//         case 'not':
//           prev[field] = LessThanOrEqualThan(value);
//           break;
//         case 'gt':
//           prev[field] = MoreThan(value);
//           break;
//         // Implement other operators as needed
//         default:
//           break;
//       }
//       return prev;
//     }, {} as WhereConditions);
//     return qb.where(conditions);
//   }

//   static sortBy(qb: QueryBuilder<any>, sort: { field: string; order: 'ASC' | 'DESC' }[]) {
//     sort.forEach((sortOption) => {
//       qb.orderBy(sortOption.field, sortOption.order);
//     });
//     return qb;
//   }
// }

// function MoreThan(value: number | Date) {
//   return '>' + value;
// }

// function LessThanOrEqualThan(value: number | Date) {
//   return '<=' + value;
// }
