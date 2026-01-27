import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RankingsModule } from './rankings/rankings.module';
import { Player } from './player/player.entity';
import { PlayerController } from './player/player.controller';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Player],
      synchronize: true, // Désactiver en prod
    }),
    RankingsModule,
    PlayerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
