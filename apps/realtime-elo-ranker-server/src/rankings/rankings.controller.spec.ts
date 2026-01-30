import { RankingsController } from './rankings.controller';
import { NotFoundException } from '@nestjs/common';

describe('RankingsController', () => {
  let controller: RankingsController;
  let mockService: any;

  beforeEach(() => {
    mockService = {
      getAllRankings: jest.fn(),
      updateRanking: jest.fn(),
      getRankingUpdates: jest.fn(),
    };
    controller = new RankingsController(mockService);
  });

  it('getRanking throws NotFoundException when empty', () => {
    mockService.getAllRankings.mockReturnValue([]);
    expect(() => controller.getRanking()).toThrow(NotFoundException);
  });

  it('getRanking returns rankings when present', () => {
    mockService.getAllRankings.mockReturnValue([{ id: 'p', rank: 100 }]);
    const res = controller.getRanking();
    expect(res).toEqual([{ id: 'p', rank: 100 }]);
  });

  it('addTestPlayer calls service.updateRanking and returns message', async () => {
    const player = { id: 'z', rank: 1111 };
    mockService.updateRanking.mockResolvedValue(undefined);
    const resp = await controller.addTestPlayer(player);
    expect(mockService.updateRanking).toHaveBeenCalledWith('z', 1111);
    expect(resp.message).toBe('Joueur ajouté au cache');
    expect(resp.player).toBe(player);
  });

  it('sse returns service observable', () => {
    const obs = { subscribe: () => {} };
    mockService.getRankingUpdates.mockReturnValue(obs);
    expect(controller.sse()).toBe(obs);
  });
});
