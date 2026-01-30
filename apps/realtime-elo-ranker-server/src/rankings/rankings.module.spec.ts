import { Test, TestingModule } from '@nestjs/testing';
import { RankingsModule } from './rankings.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('RankingsModule', () => {
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [],
                    synchronize: true,
                    autoLoadEntities: true,
                }),
                RankingsModule
            ],
        })
            .compile();
    });

    it('should be defined', () => {
        expect(module).toBeDefined();
    });
});
