import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface PlayerRanking {
  id: string;
  rank: number;
}

@Injectable()
export class RankingsService {
  constructor() {
    this.updateRanking('player-1', 1200);
    this.updateRanking('player-2', 1000);
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
      .sort((a, b) => b.rank - a.rank); // Optionnel: Trier par rang décroissant
  }

  // Créer un nouveau joueur
  createPlayer(id: string): PlayerRanking {
    if (this.rankingCache.has(id)) {
      throw new Error('Player already exists');
    }
    const defaultRank = 1200;
    this.rankingCache.set(id, defaultRank);
    const newPlayer = { id, rank: defaultRank };
    this.notifyUpdate(newPlayer);
    return newPlayer;
  }

  // Vérifier si un joueur existe
  playerExists(id: string): boolean {
    return this.rankingCache.has(id);
  }

  // Mettre à jour ou ajouter un joueur (utilisé par la logique de match)
  updateRanking(id: string, rank: number) {
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
