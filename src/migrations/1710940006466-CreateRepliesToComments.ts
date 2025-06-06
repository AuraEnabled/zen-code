import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRepliesToComments1710940006466 implements MigrationInterface {
    name = 'CreateRepliesToComments1710940006466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ADD "replyToId" integer`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7003671d633d8cd4a7e3f1933cb" FOREIGN KEY ("replyToId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7003671d633d8cd4a7e3f1933cb"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "replyToId"`);
    }

}
