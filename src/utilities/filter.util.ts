import { Injectable } from '@nestjs/common';
import { Filter, Sort } from 'src/room/dto/interfaces';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class FilterUtil {

    /**
     * @description This is a utility function that paginates results from a query
     * @param qb QueryBuilder instace
     * @param page page number needed
     * @param limit limit needed per page
     * @returns returns a paginated QueryBuilder
     */
    static paginate(qb: SelectQueryBuilder<any>, page: number, limit: number): SelectQueryBuilder<any> {
        return qb.offset(page).limit(limit);
    }


    /**
     * @description This is a utility function that sorts the given table in ascending or descending order
     * @param qb QueryBuilder instace 
     * @param sort sort object array containing sort option
     * @param tableName name of table to run query on
     * @returns returns a sorted QueryBuilder 
     */
    static sortBy(qb: SelectQueryBuilder<any>, sort: Sort[], tableName: string): SelectQueryBuilder<any> {
        sort.forEach(({ field, order }) => {
            qb.addOrderBy(`${tableName}.${field}`, order);
        });
        return qb;
    }

    /**
     * @
     * @description This is a utility function that filter the given table based on filter operators such as: 'gt (greater than)', 'lt (less than) and more...
     * @param qb QueryBuilder instace
     * @param filters filter object array containing filter options
     * @param tableName Name of table to run query on
     * @returns returns a filtered QueryBuilder 
     */

    static filterBy(qb: SelectQueryBuilder<any>, filters: Filter[], tableName: string): SelectQueryBuilder<any> {
        filters.forEach(({ field, value, operator }) => {
            switch (operator) {
                case 'equals':
                    qb.where(`${tableName}.${field} = :${field}`, { [field]: value });
                    break;
                case 'not':
                    qb.where(`${tableName}.${field} != :${field}`, { [field]: value });
                    break;
                case 'gt':
                    qb.where(`${tableName}.${field} > :${field}`, { [field]: value });
                    break;
                case 'gte':
                    qb.where(`${tableName}.${field} >= :${field}`, { [field]: value });
                    break;
                case 'lt':
                    qb.where(`${tableName}.${field} < :${field}`, { [field]: value });
                    break;
                case 'lte':
                    qb.where(`${tableName}.${field} <= :${field}`, { [field]: value });
                    break;
                case 'like':
                    qb.where(`${tableName}.${field} like :${field}`, { [field]: `%${value}%` });
                    break;
                case 'in':
                    qb.where(`${tableName}.${field} IN (:...${field})`, { [field]: value });
                    break;
                case 'notIn':
                    qb.where(`${tableName}.${field} NOT IN (:...${field})`, { [field]: [value] });
                    break;
                case 'isNull':
                    qb.where(`${tableName}.${field} IS NULL`);
                    break;
                case 'isNotNull':
                    qb.where(`${tableName}.${field} IS NOt NULL`);
                    break;
                default:
                    throw new Error(`Unsupported operator: ${operator}`);
            }
        })
        return qb
    }
}
