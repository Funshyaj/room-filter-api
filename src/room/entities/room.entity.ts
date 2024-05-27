import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Room {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    capacity: number;

    @Column()
    userId: number
}