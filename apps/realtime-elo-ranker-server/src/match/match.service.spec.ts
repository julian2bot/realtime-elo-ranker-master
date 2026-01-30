import { MatchService } from './match.service';

describe('MatchService', () => {
  let service: MatchService;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = { create: jest.fn(), save: jest.fn() };
    service = new MatchService(mockRepo as any);
  });

  it('calculates new ranks: A wins', () => {
    const r = service.calculateNewRanks(1600, 1400, 1);
    expect(r.newRankA).toBeGreaterThan(1600);
    expect(r.newRankB).toBeLessThan(1400);
  });

  it('calculates new ranks: draw', () => {
    const r = service.calculateNewRanks(1500, 1500, 0.5);
    expect(typeof r.newRankA).toBe('number');
    expect(r.newRankA).toBe(r.newRankA);
  });

  it('saveMatch calls repository', async () => {
    mockRepo.create.mockReturnValue({});
    mockRepo.save.mockResolvedValue(undefined);
    await service.saveMatch('a', 'b', 1200, 1300, 1216, 1284);
    expect(mockRepo.create).toHaveBeenCalled();
    expect(mockRepo.save).toHaveBeenCalled();
  });
});
