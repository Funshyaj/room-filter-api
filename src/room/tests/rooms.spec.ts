import { Test, TestingModule } from '@nestjs/testing';
import { RoomController } from '../room.controller';
import { RoomService } from '../room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomModule } from '../room.module';
import { Room } from '../entities/room.entity';

describe('RoomController', () => {
    let roomController: RoomController;
    let roomService: RoomService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [RoomModule, TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'password', //local database password
                database: 'funshy', //local database name
                entities: [Room],
                synchronize: false
            })
            ],
        }).compile()
        // {
        //     provide: RoomService,
        //     useValue: {
        //   findAll: jest.fn().mockResolvedValue([
        //     {
        //       firstName: 'firstName #1',
        //       lastName: 'lastName #1',
        //     },
        //     {
        //       firstName: 'firstName #2',
        //       lastName: 'lastName #2',
        //     },
        //   ]),
        // findOne: jest.fn().mockImplementation((id: string) =>
        //     Promise.resolve(
        //         {
        //             "id": 9,
        //             "name": "Board Room G",
        //             "capacity": 12,
        //             "userId": 10
        //         },
        //     ),
        // ),
        // remove: jest.fn(),
        //         },
        // },

        roomService = moduleRef.get<RoomService>(RoomService);
        roomController = moduleRef.get<RoomController>(RoomController);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Check if defined', () => {
        it('should be defined', () => {
            expect(roomController).toBeDefined();
        });
    });

    describe('Checks if findAll works', () => {
        // first test case
        it('should return a list of rooms with pagination (page=1, limit=20) and sorted by name in ascending order', async () => {
            const result = [
                {
                    "id": 7,
                    "name": "Board Room G",
                    "capacity": 12,
                    "userId": 1
                },
                {
                    "id": 20,
                    "name": "Brainstorming Room T",
                    "capacity": 12,
                    "userId": 4
                },
                {
                    "id": 16,
                    "name": "Briefing Room P",
                    "capacity": 14,
                    "userId": 4
                },
                {
                    "id": 12,
                    "name": "Collaboration Room L",
                    "capacity": 10,
                    "userId": 3
                },
                {
                    "id": 1,
                    "name": "Conference Room A",
                    "capacity": 10,
                    "userId": 1
                },
                {
                    "id": 8,
                    "name": "Conference Room H",
                    "capacity": 10,
                    "userId": 3
                },
                {
                    "id": 18,
                    "name": "Consultation Room R",
                    "capacity": 5,
                    "userId": 3
                },
                {
                    "id": 6,
                    "name": "Discussion Room F",
                    "capacity": 5,
                    "userId": 4
                },
                {
                    "id": 13,
                    "name": "Focus Room M",
                    "capacity": 2,
                    "userId": 2
                },
                {
                    "id": 19,
                    "name": "Interview Room S",
                    "capacity": 3,
                    "userId": 2
                }
            ];
            const page = 0;
            const limit = 10;
            const sort = '[{"field":"name","order":"ASC"}]'
            const filters = ''
            const returnData = {
                result,
                page,
                limit,
                count: result.length
            }
            jest.spyOn(roomService, 'findAll').mockImplementation(() => Promise.resolve(returnData));

            expect(roomController.findAll({ page, limit, sort, filters })).resolves.toEqual(returnData);
        });

        // second test case
        it('should return a list of rooms with pagination (page=0, limit=5) and sorted by name in ascending order and filter to show rooms with capacity greater than or equal to 10', async () => {
            const result = [
                {
                    "id": 7,
                    "name": "Board Room G",
                    "capacity": 12,
                    "userId": 1
                },
                {
                    "id": 20,
                    "name": "Brainstorming Room T",
                    "capacity": 12,
                    "userId": 4
                },
                {
                    "id": 16,
                    "name": "Briefing Room P",
                    "capacity": 14,
                    "userId": 4
                },
                {
                    "id": 12,
                    "name": "Collaboration Room L",
                    "capacity": 10,
                    "userId": 3
                },
                {
                    "id": 1,
                    "name": "Conference Room A",
                    "capacity": 10,
                    "userId": 1
                }
            ];
            const page = 0;
            const limit = 5;
            const sort = '[{"field":"name","order":"ASC"}]'
            const filters = '[{"field":"capacity","value":10,"operator":"gte"}]'
            const returnData = {
                result,
                page,
                limit,
                count: result.length
            }
            jest.spyOn(roomService, 'findAll').mockImplementation(() => Promise.resolve(returnData));

            expect(roomController.findAll({ page, limit, sort, filters })).resolves.toEqual(returnData);
        });

        // third test case
        it('should return a list of rooms with pagination (page=1, limit=2) and sorted by capacity in descending order and filter to show rooms with userId as 1', async () => {
            const result = [
                {
                    "id": 14,
                    "name": "Presentation Room N",
                    "capacity": 18,
                    "userId": 1
                },
                {
                    "id": 7,
                    "name": "Board Room G",
                    "capacity": 12,
                    "userId": 1
                }
            ];
            const page = 1;
            const limit = 2;
            const sort = '[{"field":"capacity","order":"DESC"}]'
            const filters = '[{"field":"userId","value":1,"operator":"equals"}]'
            const returnData = {
                result,
                page,
                limit,
                count: result.length
            }
            jest.spyOn(roomService, 'findAll').mockImplementation(() => Promise.resolve(returnData));

            expect(roomController.findAll({ page, limit, sort, filters })).resolves.toEqual(returnData);
        });

        // fourth test 
        it('should return a list of rooms with pagination (page=0, limit=5) and sorted by userId in ascending order and filter to show rooms with "Room" in their name', async () => {
            const result = [
                {
                    "id": 14,
                    "name": "Presentation Room N",
                    "capacity": 18,
                    "userId": 1
                },
                {
                    "id": 7,
                    "name": "Board Room G",
                    "capacity": 12,
                    "userId": 1
                }
            ];
            const page = 0;
            const limit = 5;
            const sort = '[{"field":"userId","order":"ASC"}]'
            const filters = '[{"field":"name","value":"Room","operator":"like"}]'
            const returnData = {
                result,
                page,
                limit,
                count: result.length
            }
            jest.spyOn(roomService, 'findAll').mockImplementation(() => Promise.resolve(returnData));

            expect(roomController.findAll({ page, limit, sort, filters })).resolves.toEqual(returnData);
        });
    });

    describe('Check if findOne works', () => {
        it('should find a room by Id', async () => {
            const result = {
                "id": 7,
                "name": "Board Room G",
                "capacity": 12,
                "userId": 1
            }
            jest.spyOn(roomService, 'findOne').mockImplementation(() => Promise.resolve(result));
            expect(roomController.findOne('7')).resolves.toEqual(result);
        });
    });
});
