import fetchRanking from './fetch-ranking';

describe('fetchRanking', () => {
  const base = 'http://localhost:8888';

  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn();
  });

  it('resolves with JSON when ok', async () => {
    const data = [{ id: 'p', rank: 100 }];
    // @ts-ignore
    global.fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(data) });
    const res = await fetchRanking(base);
    expect(res).toEqual(data);
    expect(global.fetch).toHaveBeenCalledWith(base + '/api/ranking', { method: 'GET' });
  });

  it('throws on non-ok response', async () => {
    // @ts-ignore
    global.fetch.mockResolvedValue({ ok: false });
    await expect(fetchRanking(base)).rejects.toThrow('Failed to fetch ranking');
  });
});
