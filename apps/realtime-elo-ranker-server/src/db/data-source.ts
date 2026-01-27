import { DataSource } from 'typeorm';
import { Player } from '../player/player.entity';
import { Match } from '../match/match.entity';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: false, // Always false for migrations
    entities: [Player, Match],
    migrations: ['src/migrations/*.ts'],
});
