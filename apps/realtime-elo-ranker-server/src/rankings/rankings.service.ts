import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from '../player/player.entity';
import { PlayerRanking } from '../all.interface';


@Injectable()
export class RankingsService implements OnModuleInit {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) { }

  async onModuleInit() {
    console.log('Initializing Rankings cache from Database...');
    const players = await this.playerRepository.find();
    if (players.length === 0) {
      console.log('Database empty, seeding with default players...');
      // // Optionnel: Seeder avec des fakes si vide
      // await this.createPlayer('player-1');
      // await this.updateRanking('player-1', 1200);
      // await this.createPlayer('player-2');
      // await this.updateRanking('player-2', 1000);
    } else {
      for (const p of players) {
        this.rankingCache.set(p.id, p.rank);
      }
      console.log(`Loaded ${players.length} players into cache.`);
    }
  }

  // Le cache en mémoire
  private rankingCache: Map<string, number> = new Map();

  // Le Subject qui servira de "diffuseur"
  private rankingUpdates$ = new Subject<PlayerRanking>();

  // Récupérer tout le classement
  getAllRankings(): PlayerRanking[] {
    return Array.from(this.rankingCache.entries())
      .map(([id, rank]) => ({
        id,
        rank,
      }))
      .sort((a, b) => b.rank - a.rank);
  }

  // Vérifier si un joueur existe
  playerExists(id: string): boolean {
    return this.rankingCache.has(id);
  }

  // Mettre à jour ou ajouter un joueur (utilisé par la logique de match)
  async updateRanking(id: string, rank: number) {
    // Save to DB
    await this.playerRepository.save({ id, rank });

    // Update Cache
    this.rankingCache.set(id, rank);
    this.notifyUpdate({ id, rank });
  }

  // Récupérer le rang d'un seul joueur
  getRanking(id: string): number | undefined {
    return this.rankingCache.get(id);
  }

  // MÃ©thode pour s'abonner au flux
  getRankingUpdates(): Observable<any> {
    return this.rankingUpdates$.asObservable().pipe(
      map(player => ({ data: { type: 'RankingUpdate', player } }))
    );
  }

  // MÃ©thode pour envoyer une notification
  notifyUpdate(player: PlayerRanking) {
    this.rankingUpdates$.next(player);
  }
}
