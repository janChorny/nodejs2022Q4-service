import { MigrationInterface, QueryRunner } from 'typeorm';

export class first1676492335046 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "user" (login, password) VALUES ('admin', 'admin')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
