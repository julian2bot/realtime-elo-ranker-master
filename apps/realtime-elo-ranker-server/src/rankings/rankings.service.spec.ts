import { RankingsService } from './rankings.service';

describe('RankingsService', () => {
  let service: RankingsService;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      find: jest.fn(),
      save: jest.fn(),
    };
    service = new RankingsService(mockRepo as any);
  });

  it('onModuleInit loads empty DB gracefully', async () => {
    mockRepo.find.mockResolvedValue([]);
    await service.onModuleInit();
    expect(service.getAllRankings()).toEqual([]);
  });

  it('onModuleInit loads players into cache', async () => {
    mockRepo.find.mockResolvedValue([{ id: 'a', rank: 1500 }, { id: 'b', rank: 1300 }]);
    await service.onModuleInit();
    const all = service.getAllRankings();
    expect(all.length).toBe(2);
    expect(all[0].rank).toBeGreaterThanOrEqual(all[1].rank);
  });

  it('updateRanking saves to DB, updates cache and emits event', async () => {
    mockRepo.save.mockResolvedValue(undefined);
    const events: any[] = [];
    service.getRankingUpdates().subscribe((e) => events.push(e));
    await service.updateRanking('x', 1400);
    expect(mockRepo.save).toHaveBeenCalledWith({ id: 'x', rank: 1400 });
    expect(service.getRanking('x')).toBe(1400);
    expect(events.length).toBe(1);
    expect(events[0].data.player.id).toBe('x');
  });

  it('playerExists and getRanking behave as expected', async () => {
    expect(service.playerExists('nope')).toBe(false);
    await service.updateRanking('y', 1234);
    expect(service.playerExists('y')).toBe(true);
    expect(service.getRanking('y')).toBe(1234);
  });
});
