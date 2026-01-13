import { Module } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import { RankingsController } from './rankings.controller';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';

@Module({
  providers: [RankingsService, MatchService],
  controllers: [RankingsController, MatchController]
})
export class RankingsModule { }
