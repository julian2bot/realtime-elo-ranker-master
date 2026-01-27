import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMatchTable1769546401321 implements MigrationInterface {
    name = 'AddMatchTable1769546401321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "match" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "player1" varchar NOT NULL, "player2" varchar NOT NULL, "player1Rank" integer NOT NULL, "player2Rank" integer NOT NULL, "player1NewRank" integer NOT NULL, "player2NewRank" integer NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "match"`);
    }

}
