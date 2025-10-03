import { MigrationInterface, QueryRunner } from "typeorm";

export class InvoiceFix21759419148684 implements MigrationInterface {
    name = 'InvoiceFix21759419148684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice" DROP COLUMN "items"`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD "items" json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice" DROP COLUMN "items"`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD "items" text NOT NULL`);
    }

}
