import { Test, TestingModule } from '@nestjs/testing';
import { MatchModule } from './match.module';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingsModule } from '../rankings/rankings.module';
import { RankingsService } from '../rankings/rankings.service';
import { Match } from './match.entity';

describe('MatchModule', () => {
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
                MatchModule
            ],
        })
            .overrideModule(RankingsModule)
            .useModule({
                module: class MockRankingsModule { },
                providers: [{
                    provide: RankingsService,
                    useValue: {
                        playerExists: jest.fn(),
                        updateRanking: jest.fn(),
                        getRanking: jest.fn(),
                    }
                }],
                exports: [RankingsService],
            })
            .compile();
        // Note: NestJS testing module compilation might still try to process imports.
        // If MatchModule imports TypeOrmModule.forFeature, we need to ensure that works or is mocked.
    });

    // A simpler way to test a Module class specifically for coverage (since it usually has no logic) is just to instantiate it if it has a constructor, but usually it's a class with metadata.
    // The 'compile()' above basically tests the metadata resolution mostly.
    // If we just want 100% file coverage of match.module.ts, and it's just a class with @Module,
    // we can treat it as a black box that just needs to be imported.

    it('should be defined', () => {
        // We might fail here if TypeOrmModule.forFeature cannot be mocked easily like this without a valid connection or forRoot.
        // Let's try a different approach if valid connection is required.
        // But overriding TypeOrmModule should work.
        expect(module).toBeDefined();
    });
});
