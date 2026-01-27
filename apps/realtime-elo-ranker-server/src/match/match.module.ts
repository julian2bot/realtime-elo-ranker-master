import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchController } from './match.controller';
import { Match } from './match.entity';
import { MatchService } from './match.service';
import { RankingsModule } from '../rankings/rankings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match]),
    RankingsModule
  ],
  providers: [MatchService],
  controllers: [MatchController]
})
export class MatchModule { }
