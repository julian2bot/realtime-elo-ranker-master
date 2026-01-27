import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerController } from './player.controller';
import { Player } from './player.entity';
import { PlayerService } from './player.service';
import { RankingsModule } from '../rankings/rankings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
    RankingsModule
  ],
  providers: [PlayerService],
  controllers: [PlayerController]
})
export class PlayerModule { }
