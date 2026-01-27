import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RankingsModule } from './rankings/rankings.module';
import { Player } from './player/player.entity';
import { Match } from './match/match.entity';
import { PlayerModule } from './player/player.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Player, Match],
      synchronize: true, // Désactiver en prod
    }),
    RankingsModule,
    PlayerModule,
    MatchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
