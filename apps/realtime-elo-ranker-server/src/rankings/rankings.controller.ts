import { Controller, Get, Post, Body, ConflictException, NotFoundException, BadRequestException, HttpCode, Sse } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import type { PlayerRanking } from '../all.interface';
import { Observable } from 'rxjs';

@Controller('api') // Changé pour couvrir /api/ranking
export class RankingsController {
    constructor(private readonly rankingsService: RankingsService) { }

    @Get('ranking')
    getRanking(): PlayerRanking[] {
        const rankings = this.rankingsService.getAllRankings();
        if (rankings.length === 0) {
            throw new NotFoundException({
                code: 404,
                message: 'Le classement n’est pas disponible car aucun joueur n’existe',
            });
        }
        return rankings;
    }


    // Endpoint temporaire pour tester l'ajout manuel dans le cache
    @Post('ranking/test')
    async addTestPlayer(@Body() player: PlayerRanking) {
        await this.rankingsService.updateRanking(player.id, player.rank);
        return { message: 'Joueur ajouté au cache', player };
    }


    @Sse('ranking/events') // L'URL sera http://localhost:8888/api/ranking/events
    sse(): Observable<any> {
        return this.rankingsService.getRankingUpdates();
    }
}