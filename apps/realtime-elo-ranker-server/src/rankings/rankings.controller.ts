import { Controller, Get, Post, Body, ConflictException, NotFoundException, BadRequestException, HttpCode } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import type { PlayerRanking } from './rankings.service';

@Controller('api') // Changé pour couvrir /api/ranking et /api/player
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

    @Post('player')
    @HttpCode(200) // Swagger spec uses 200 for player creation
    createPlayer(@Body() body: { id: string }): PlayerRanking {
        if (!body.id || typeof body.id !== 'string') {
            throw new BadRequestException({
                code: 400,
                message: 'L’identifiant du joueur n’est pas valide',
            });
        }
        try {
            return this.rankingsService.createPlayer(body.id);
        } catch (error) {
            if (error.message === 'Player already exists') {
                throw new ConflictException({
                    code: 409,
                    message: 'Le joueur existe déjà',
                });
            }
            throw error;
        }
    }

    // Endpoint temporaire pour tester l'ajout manuel dans le cache
    @Post('ranking/test')
    addTestPlayer(@Body() player: PlayerRanking) {
        this.rankingsService.updateRanking(player.id, player.rank);
        return { message: 'Joueur ajouté au cache', player };
    }
}