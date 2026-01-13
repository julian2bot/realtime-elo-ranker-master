import { Injectable } from '@nestjs/common';

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
    return { id, rank: defaultRank };
  }

  // Vérifier si un joueur existe
  playerExists(id: string): boolean {
    return this.rankingCache.has(id);
  }

  // Mettre à jour ou ajouter un joueur (utilisé par la logique de match)
  updateRanking(id: string, rank: number) {
    this.rankingCache.set(id, rank);
  }

  // Récupérer le rang d'un seul joueur
  getRanking(id: string): number | undefined {
    return this.rankingCache.get(id);
  }
}
