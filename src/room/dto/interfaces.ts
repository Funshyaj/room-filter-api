import { Room } from "../entities/room.entity";

export interface Queries {
    page?: number
    limit?: number
    filters?: string,
    sort?: string
}

export interface Sort {
    field: string;
    order: 'ASC' | 'DESC'
}

export interface Filter {
    field: string,
    operator: string,
    value: string
}

export interface Result {
    result: Room[],
    count: number | string
    page?: number | string
    limit?: number | string
}
