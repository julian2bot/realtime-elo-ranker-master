import { Controller, Post, Body, ConflictException, BadRequestException, HttpCode } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from './player.entity';


@Controller('api') // Changé pour couvrir /api/player
export class PlayerController {
    constructor(private readonly playerService: PlayerService) { }


    @Post('player')
    @HttpCode(200) // Swagger spec uses 200 for player creation
    async createPlayer(@Body() body: { id: string }): Promise<Player> {
        if (!body.id || typeof body.id !== 'string') {
            throw new BadRequestException({
                code: 400,
                message: 'L’identifiant du joueur n’est pas valide',
            });
        }
        try {
            return await this.playerService.createPlayer(body.id);
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

}