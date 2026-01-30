import subscribeRankingEvents from './subscribe-ranking-events';

describe('subscribeRankingEvents', () => {
  const base = 'http://localhost:8888';
  const origEventSource = (global as any).EventSource;

  beforeEach(() => {
    (global as any).EventSource = jest.fn(function (url: string) {
      (this as any).url = url;
    });
  });

  afterEach(() => {
    (global as any).EventSource = origEventSource;
  });

  it('creates an EventSource with correct URL', () => {
    const es = subscribeRankingEvents(base);
    expect((global as any).EventSource).toHaveBeenCalledWith(base + '/api/ranking/events');
    expect((es as any).url).toBe(base + '/api/ranking/events');
  });
});
