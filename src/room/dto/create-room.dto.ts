import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoomDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    capacity: number;

    @IsNotEmpty()
    userId: number;
}
