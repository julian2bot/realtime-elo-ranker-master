import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RankingsModule } from './rankings/rankings.module';

@Module({
  imports: [RankingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
