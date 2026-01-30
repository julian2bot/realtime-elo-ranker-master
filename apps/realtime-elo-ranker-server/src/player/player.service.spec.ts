import { PlayerService } from './player.service';

describe('PlayerService', () => {
  let service: PlayerService;
  let mockRepo: any;
  let mockRankings: any;

  beforeEach(() => {
    mockRepo = { find: jest.fn(), findOne: jest.fn(), create: jest.fn(), save: jest.fn() };
    mockRankings = { updateRanking: jest.fn() };
    service = new PlayerService(mockRepo as any, mockRankings as any);
  });

  it('getAvgRank returns 1200 when no players', async () => {
    mockRepo.find.mockResolvedValue([]);
    expect(await service.getAvgRank()).toBe(1200);
  });

  it('getAvgRank returns rounded average', async () => {
    mockRepo.find.mockResolvedValue([{ rank: 1201 }, { rank: 1199 }]);
    expect(await service.getAvgRank()).toBe(1200);
  });

  it('playerExists returns true/false', async () => {
    mockRepo.findOne.mockResolvedValue(null);
    expect(await service.playerExists('x')).toBe(false);
    mockRepo.findOne.mockResolvedValue({ id: 'x' });
    expect(await service.playerExists('x')).toBe(true);
  });

  it('createPlayer throws if exists', async () => {
    mockRepo.findOne.mockResolvedValue({ id: 'a' });
    await expect(service.createPlayer('a')).rejects.toThrow('Player already exists');
  });

  it('createPlayer creates, saves and updates rankings', async () => {
    mockRepo.findOne.mockResolvedValue(null);
    mockRepo.find.mockResolvedValue([]);
    mockRepo.create.mockReturnValue({ id: 'n', rank: 1200 });
    mockRepo.save.mockResolvedValue({ id: 'n', rank: 1200 });
    mockRankings.updateRanking.mockResolvedValue(undefined);

    const res = await service.createPlayer('n');
    expect(mockRepo.create).toHaveBeenCalled();
    expect(mockRepo.save).toHaveBeenCalled();
    expect(mockRankings.updateRanking).toHaveBeenCalledWith('n', 1200);
    expect(res.id).toBe('n');
  });
});
