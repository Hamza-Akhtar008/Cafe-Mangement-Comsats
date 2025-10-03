import { MigrationInterface, QueryRunner } from "typeorm";

export class InvoiceFix1759414138532 implements MigrationInterface {
    name = 'InvoiceFix1759414138532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice" ADD "items" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice" DROP COLUMN "items"`);
    }

}
