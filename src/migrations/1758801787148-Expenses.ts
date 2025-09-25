import { MigrationInterface, QueryRunner } from "typeorm";

export class Expenses1758801787148 implements MigrationInterface {
    name = 'Expenses1758801787148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "expense" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "amount" numeric(10,2) NOT NULL, "category" character varying NOT NULL DEFAULT 'general', "date" date NOT NULL DEFAULT ('now'::text)::date, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_edd925b450e13ea36197c9590fc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "expense"`);
    }

}
