import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1769548245854 implements MigrationInterface {
    name = 'InitialSchema1769548245854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "player" ("id" varchar PRIMARY KEY NOT NULL, "rank" integer NOT NULL DEFAULT (1000))`);
        await queryRunner.query(`CREATE TABLE "match" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "player1" varchar NOT NULL, "player2" varchar NOT NULL, "player1Rank" integer NOT NULL, "player2Rank" integer NOT NULL, "player1NewRank" integer NOT NULL, "player2NewRank" integer NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "match"`);
        await queryRunner.query(`DROP TABLE "player"`);
    }

}
