import { InitialSchema1769548245854 } from './1769548245854-InitialSchema';
import { QueryRunner } from 'typeorm';

describe('InitialSchema1769548245854', () => {
    let migration: InitialSchema1769548245854;
    let mockQueryRunner: QueryRunner;

    beforeEach(() => {
        migration = new InitialSchema1769548245854();
        mockQueryRunner = {
            query: jest.fn(),
        } as any;
    });

    it('up creates tables', async () => {
        await migration.up(mockQueryRunner);
        expect(mockQueryRunner.query).toHaveBeenCalledTimes(2);
        expect(mockQueryRunner.query).toHaveBeenCalledWith(expect.stringContaining('CREATE TABLE "player"'));
        expect(mockQueryRunner.query).toHaveBeenCalledWith(expect.stringContaining('CREATE TABLE "match"'));
    });

    it('down drops tables', async () => {
        await migration.down(mockQueryRunner);
        expect(mockQueryRunner.query).toHaveBeenCalledTimes(2);
        expect(mockQueryRunner.query).toHaveBeenCalledWith(expect.stringContaining('DROP TABLE "match"'));
        expect(mockQueryRunner.query).toHaveBeenCalledWith(expect.stringContaining('DROP TABLE "player"'));
    });
});
