import { Test, TestingModule } from '@nestjs/testing';
import { PlayerModule } from './player.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingsModule } from '../rankings/rankings.module';
import { RankingsService } from '../rankings/rankings.service';

describe('PlayerModule', () => {
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
                PlayerModule
            ],
        })
            .overrideModule(RankingsModule)
            .useModule({
                module: class MockRankingsModule { },
                providers: [{
                    provide: RankingsService,
                    useValue: {
                        updateRanking: jest.fn(),
                        playerExists: jest.fn(),
                        getRanking: jest.fn(),
                    }
                }],
                exports: [RankingsService],
            })
            .compile();
    });

    it('should be defined', () => {
        expect(module).toBeDefined();
    });
});
