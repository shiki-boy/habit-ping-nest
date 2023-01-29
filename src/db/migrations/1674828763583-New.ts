import { MigrationInterface, QueryRunner } from 'typeorm';

export class New1674828763583 implements MigrationInterface {
  name = 'New1674828763583';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying(32) NOT NULL, "lastName" character varying(32) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_df955cae05f17b2bcf5045cc021" PRIMARY KEY ("uid"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."habit_name_enum" AS ENUM('Work Out', 'Sleep', 'Reading', 'Eat Food', 'Diet', 'Art', 'Music', 'Travel', 'Gaming')`,
    );
    await queryRunner.query(
      `CREATE TABLE "habit" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" "public"."habit_name_enum" NOT NULL, CONSTRAINT "UQ_99fcbd834ac5db24226e065889b" UNIQUE ("name"), CONSTRAINT "PK_745f12b29d707a348004d715023" PRIMARY KEY ("uid"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."goal_status_enum" AS ENUM('Pending', 'Completed', 'Not Started', 'Missed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "goal" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying(32) NOT NULL, "points" integer NOT NULL, "duration" interval NOT NULL, "date" TIMESTAMP NOT NULL, "status" "public"."goal_status_enum" NOT NULL DEFAULT 'Not Started', "userUid" uuid, "habitUid" uuid, CONSTRAINT "PK_5825b386ae5a0b5b1bc6c6a8879" PRIMARY KEY ("uid"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "goal" ADD CONSTRAINT "FK_01c6924b1ecb0bfcceed1e3614e" FOREIGN KEY ("userUid") REFERENCES "user"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "goal" ADD CONSTRAINT "FK_da560ea14e379d266c858697413" FOREIGN KEY ("habitUid") REFERENCES "habit"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "goal" DROP CONSTRAINT "FK_da560ea14e379d266c858697413"`,
    );
    await queryRunner.query(
      `ALTER TABLE "goal" DROP CONSTRAINT "FK_01c6924b1ecb0bfcceed1e3614e"`,
    );
    await queryRunner.query(`DROP TABLE "goal"`);
    await queryRunner.query(`DROP TYPE "public"."goal_status_enum"`);
    await queryRunner.query(`DROP TABLE "habit"`);
    await queryRunner.query(`DROP TYPE "public"."habit_name_enum"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
