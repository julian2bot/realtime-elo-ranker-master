import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingsService } from './rankings.service';
import { RankingsController } from './rankings.controller';
import { Player } from '../player/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  providers: [RankingsService],
  controllers: [RankingsController],
  exports: [RankingsService]
})
export class RankingsModule { }
