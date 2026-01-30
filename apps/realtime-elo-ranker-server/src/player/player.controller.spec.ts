import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { BadRequestException, ConflictException } from '@nestjs/common';

describe('PlayerController', () => {
    let controller: PlayerController;
    let service: PlayerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlayerController],
            providers: [
                {
                    provide: PlayerService,
                    useValue: {
                        createPlayer: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<PlayerController>(PlayerController);
        service = module.get<PlayerService>(PlayerService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('createPlayer', () => {
        it('should throw BadRequestException if id is missing or invalid', async () => {
            await expect(controller.createPlayer({} as any)).rejects.toThrow(BadRequestException);
            await expect(controller.createPlayer({ id: 123 } as any)).rejects.toThrow(BadRequestException);
        });

        it('should throw ConflictException if player already exists', async () => {
            jest.spyOn(service, 'createPlayer').mockRejectedValue(new Error('Player already exists'));
            await expect(controller.createPlayer({ id: 'exist' })).rejects.toThrow(ConflictException);
        });

        it('should throw other errors', async () => {
            jest.spyOn(service, 'createPlayer').mockRejectedValue(new Error('Other error'));
            await expect(controller.createPlayer({ id: 'test' })).rejects.toThrow('Other error');
        });

        it('should create player', async () => {
            const mockPlayer = { id: 'new', rank: 1200 };
            jest.spyOn(service, 'createPlayer').mockResolvedValue(mockPlayer as any);
            const result = await controller.createPlayer({ id: 'new' });
            expect(result).toEqual(mockPlayer);
        });
    });
});
