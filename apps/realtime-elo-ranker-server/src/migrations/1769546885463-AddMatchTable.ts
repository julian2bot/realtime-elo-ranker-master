import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMatchTable1769546885463 implements MigrationInterface {
    name = 'AddMatchTable1769546885463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_match" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_match"("id") SELECT "id" FROM "match"`);
        await queryRunner.query(`DROP TABLE "match"`);
        await queryRunner.query(`ALTER TABLE "temporary_match" RENAME TO "match"`);
        await queryRunner.query(`CREATE TABLE "temporary_match" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "winner" varchar NOT NULL, "loser" varchar NOT NULL, "winnerRank" integer NOT NULL, "loserRank" integer NOT NULL, "winnerNewRank" integer NOT NULL, "loserNewRank" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_match"("id") SELECT "id" FROM "match"`);
        await queryRunner.query(`DROP TABLE "match"`);
        await queryRunner.query(`ALTER TABLE "temporary_match" RENAME TO "match"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" RENAME TO "temporary_match"`);
        await queryRunner.query(`CREATE TABLE "match" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`);
        await queryRunner.query(`INSERT INTO "match"("id") SELECT "id" FROM "temporary_match"`);
        await queryRunner.query(`DROP TABLE "temporary_match"`);
        await queryRunner.query(`ALTER TABLE "match" RENAME TO "temporary_match"`);
        await queryRunner.query(`CREATE TABLE "match" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "player1" varchar NOT NULL, "player2" varchar NOT NULL, "player1Rank" integer NOT NULL, "player2Rank" integer NOT NULL, "player1NewRank" integer NOT NULL, "player2NewRank" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "match"("id") SELECT "id" FROM "temporary_match"`);
        await queryRunner.query(`DROP TABLE "temporary_match"`);
    }

}
