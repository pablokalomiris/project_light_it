import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1757364685374 implements MigrationInterface {
  name = 'InitSchema1757364685374';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "patients" ("id" SERIAL NOT NULL, "full_name" character varying(150) NOT NULL, "email" character varying(100) NOT NULL, "phone" character varying(20) NOT NULL, "photo_url" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_64e2031265399f5690b0beba6a5" UNIQUE ("email"), CONSTRAINT "PK_a7f0b9fcbb3469d5ec0b0aceaa7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "patients"`);
  }
}
