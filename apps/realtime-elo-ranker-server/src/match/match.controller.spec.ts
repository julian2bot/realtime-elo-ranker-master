import { Test, TestingModule } from '@nestjs/testing';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { RankingsService } from '../rankings/rankings.service';
import { UnprocessableEntityException } from '@nestjs/common';

describe('MatchController', () => {
    let controller: MatchController;
    let rankingsService: RankingsService;
    let matchService: MatchService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MatchController],
            providers: [
                {
                    provide: RankingsService,
                    useValue: {
                        playerExists: jest.fn(),
                        getRanking: jest.fn(),
                        updateRanking: jest.fn(),
                    },
                },
                {
                    provide: MatchService,
                    useValue: {
                        calculateNewRanks: jest.fn(),
                        saveMatch: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<MatchController>(MatchController);
        rankingsService = module.get<RankingsService>(RankingsService);
        matchService = module.get<MatchService>(MatchService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('postMatch', () => {
        it('should throw UnprocessableEntityException if winner does not exist', async () => {
            jest.spyOn(rankingsService, 'playerExists').mockReturnValueOnce(false);
            await expect(
                controller.postMatch({ winner: 'unknown', loser: 'valid', draw: false }),
            ).rejects.toThrow(UnprocessableEntityException);
        });

        it('should throw UnprocessableEntityException if loser does not exist', async () => {
            jest.spyOn(rankingsService, 'playerExists').mockReturnValueOnce(true);
            jest.spyOn(rankingsService, 'playerExists').mockReturnValueOnce(false);
            await expect(
                controller.postMatch({ winner: 'valid', loser: 'unknown', draw: false }),
            ).rejects.toThrow(UnprocessableEntityException);
        });

        it('should process match correctly for win', async () => {
            jest.spyOn(rankingsService, 'playerExists').mockReturnValue(true);
            jest.spyOn(rankingsService, 'getRanking').mockReturnValueOnce(1200).mockReturnValueOnce(1200);
            jest.spyOn(matchService, 'calculateNewRanks').mockReturnValue({ newRankA: 1216, newRankB: 1184 });
            jest.spyOn(rankingsService, 'updateRanking').mockResolvedValue(undefined);
            jest.spyOn(matchService, 'saveMatch').mockResolvedValue(undefined);

            const result = await controller.postMatch({ winner: 'A', loser: 'B', draw: false });

            expect(matchService.calculateNewRanks).toHaveBeenCalledWith(1200, 1200, 1);
            expect(rankingsService.updateRanking).toHaveBeenCalledTimes(2);
            expect(matchService.saveMatch).toHaveBeenCalledWith('A', 'B', 1200, 1200, 1216, 1184);
            expect(result).toEqual({
                winner: { id: 'A', rank: 1216 },
                loser: { id: 'B', rank: 1184 },
            });
        });

        it('should process match correctly for draw', async () => {
            jest.spyOn(rankingsService, 'playerExists').mockReturnValue(true);
            jest.spyOn(rankingsService, 'getRanking').mockReturnValue(1200);
            jest.spyOn(matchService, 'calculateNewRanks').mockReturnValue({ newRankA: 1200, newRankB: 1200 });

            await controller.postMatch({ winner: 'A', loser: 'B', draw: true });

            expect(matchService.calculateNewRanks).toHaveBeenCalledWith(1200, 1200, 0.5);
        });
    });
});
