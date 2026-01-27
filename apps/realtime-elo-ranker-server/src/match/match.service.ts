import { Injectable } from '@nestjs/common';
import { MatchUpdateResult } from '../all.interface';

@Injectable()
export class MatchService {
    private readonly K = 32;

    private expectedScore(ratingA: number, ratingB: number): number {
        return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
    }
  
    //ScoreA :  1 = win, 0.5 = draw, 0 = loss
    calculateNewRanks( ratingA: number, ratingB: number, scoreA: number) {
        const expectedA = this.expectedScore(ratingA, ratingB);
        const expectedB = this.expectedScore(ratingB, ratingA);

        const newRatingA = ratingA + this.K * (scoreA - expectedA);
        const newRatingB = ratingB + this.K * ((1 - scoreA) - expectedB);

        return {
        newRankA: Math.round(newRatingA),
        newRankB: Math.round(newRatingB),
        };
    }

}
