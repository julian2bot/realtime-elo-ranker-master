import { Injectable } from '@nestjs/common';

export interface MatchUpdateResult {
    player1NewRank: number;
    player2NewRank: number;
}

@Injectable()
export class MatchService {
    private readonly K_FACTOR = 32;

    /**
     * Calcule les nouveaux scores Elo pour deux joueurs après un match.
     * @param rankA Score actuel du joueur A
     * @param rankB Score actuel du joueur B
     * @param scoreA Score du match pour le joueur A (1 = victoire, 0.5 = nul, 0 = défaite)
     */
    calculateNewRanks(rankA: number, rankB: number, scoreA: number): { newRankA: number; newRankB: number } {
        const expectedA = 1 / (1 + Math.pow(10, (rankB - rankA) / 400));
        const expectedB = 1 - expectedA;

        const scoreB = 1 - scoreA;

        const newRankA = Math.round(rankA + this.K_FACTOR * (scoreA - expectedA));
        const newRankB = Math.round(rankB + this.K_FACTOR * (scoreB - expectedB));

        return { newRankA, newRankB };
    }
}
