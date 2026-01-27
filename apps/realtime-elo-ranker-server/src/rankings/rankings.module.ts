import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingsService } from './rankings.service';
import { RankingsController } from './rankings.controller';
import { MatchService } from '../match/match.service';
import { MatchController } from '../match/match.controller';
import { Player } from '../player/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  providers: [RankingsService, MatchService],
  controllers: [RankingsController, MatchController],
  exports: [RankingsService]
})
export class RankingsModule { }
