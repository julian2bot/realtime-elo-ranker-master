import { Controller, Get, Post, Body } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import type { PlayerRanking } from './rankings.service';

@Controller('api/ranking') // Préfixe pour correspondre au Swagger
export class RankingsController {
    constructor(private readonly rankingsService: RankingsService) { }

    @Get()
    getRanking(): PlayerRanking[] {
        return this.rankingsService.getAllRankings();
    }

    // Endpoint temporaire pour tester l'ajout manuel dans le cache
    @Post('test')
    addTestPlayer(@Body() player: PlayerRanking) {
        this.rankingsService.updateRanking(player.id, player.rank);
        return { message: 'Joueur ajouté au cache', player };
    }
}