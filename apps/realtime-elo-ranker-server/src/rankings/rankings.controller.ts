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

    // @Post('player')
    // @HttpCode(200) // Swagger spec uses 200 for player creation
    // async createPlayer(@Body() body: { id: string }): Promise<PlayerRanking> {
    //     if (!body.id || typeof body.id !== 'string') {
    //         throw new BadRequestException({
    //             code: 400,
    //             message: 'L’identifiant du joueur n’est pas valide',
    //         });
    //     }
    //     try {
    //         return await this.rankingsService.createPlayer(body.id);
    //     } catch (error) {
    //         if (error.message === 'Player already exists') {
    //             throw new ConflictException({
    //                 code: 409,
    //                 message: 'Le joueur existe déjà',
    //             });
    //         }
    //         throw error;
    //     }
    // }

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