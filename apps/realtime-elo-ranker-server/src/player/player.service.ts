import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';
import { RankingsService } from '../rankings/rankings.service';



@Injectable()
export class PlayerService implements OnModuleInit {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private readonly rankingsService: RankingsService,
  ) { }

  async onModuleInit() {
    console.log("init module player")
  }

  // Créer un nouveau joueur
  async createPlayer(id: string): Promise<Player> {
    if (await this.playerExists(id)) {
      throw new Error('Player already exists');
    }

    // 
    const defaultRank = await this.getAvgRank();

    // Save to DB
    const player = this.playerRepository.create({ id, rank: defaultRank });
    await this.playerRepository.save(player);

    // Sync with Rankings cache and SSE
    await this.rankingsService.updateRanking(id, defaultRank);

    return player;
  }

  // Vérifier si un joueur existe
  async playerExists(id: string): Promise<boolean> {
    const player = await this.playerRepository.findOne({ where: { id } });
    return player !== null;
  }

  // Get avg rank Player
  async getAvgRank(): Promise<number> {
    const players = await this.playerRepository.find();
    if (players.length === 0) return 1200;
    const avgRank = players.reduce((acc, player) => acc + player.rank, 0) / players.length;
    return Math.round(avgRank);
  }
}
