import { Injectable } from '@nestjs/common';
import { MatchUpdateResult } from '../all.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './match.entity';

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match)
        private matchRepository: Repository<Match>,
    ) { }
    private readonly K = 32;

    private expectedScore(ratingA: number, ratingB: number): number {
        return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
    }
  
    //ScoreA :  1 = win, 0.5 = draw, 0 = loss
    calculateNewRanks( ratingA: number, ratingB: number, scoreA: number) {
        const expectedA = this.expectedScore(ratingA, ratingB);
        const expectedB = this.expectedScore(ratingB, ratingA);

        const newRatingA = Math.round(ratingA + this.K * (scoreA - expectedA));
        const newRatingB = Math.round(ratingB + this.K * ((1 - scoreA) - expectedB));

        return {
        newRankA: newRatingA,
        newRankB: newRatingB,
        };
    }

    async saveMatch(player1: string, player2: string, player1Rank: number, player2Rank: number, player1NewRank: number, player2NewRank: number) {
        const match = this.matchRepository.create({
            player1,
            player2,
            player1Rank,
            player2Rank,
            player1NewRank,
            player2NewRank,
        });
        await this.matchRepository.save(match);
    }
}
