import { Controller, Post, Body, UnprocessableEntityException } from '@nestjs/common';
import { RankingsService } from '../rankings/rankings.service';
import { MatchService } from './match.service';

@Controller('api/match')
export class MatchController {
    constructor(
        private readonly rankingsService: RankingsService,
        private readonly matchService: MatchService,
    ) { }

    @Post()
    async postMatch(@Body() body: { winner: string; loser: string; draw: boolean }) {
        // because my english is verry bad, draw = égalité 
        const { winner, loser, draw } = body;


        if (!this.rankingsService.playerExists(winner) || !this.rankingsService.playerExists(loser)) {
            throw new UnprocessableEntityException({
                code: 422,
                message: 'Soit le gagnant, soit le perdant indiqué n’existe pas',
            });
        }

        const rankWinner = this.rankingsService.getRanking(winner) ?? 1200;
        const rankLoser = this.rankingsService.getRanking(loser) ?? 1200;

        const scoreWinner = draw ? 0.5 : 1;
        const { newRankA: nextRankWinner, newRankB: nextRankLoser } = this.matchService.calculateNewRanks(rankWinner, rankLoser, scoreWinner);

        await this.rankingsService.updateRanking(winner, nextRankWinner);
        await this.rankingsService.updateRanking(loser, nextRankLoser);

        return {
            winner: { id: winner, rank: nextRankWinner },
            loser: { id: loser, rank: nextRankLoser },
        };
    }
}
