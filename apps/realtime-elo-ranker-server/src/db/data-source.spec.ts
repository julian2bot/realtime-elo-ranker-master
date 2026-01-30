import { AppDataSource } from './data-source';
import { DataSource } from 'typeorm';

describe('AppDataSource', () => {
    it('should be an instance of DataSource', () => {
        expect(AppDataSource).toBeInstanceOf(DataSource);
    });
});
