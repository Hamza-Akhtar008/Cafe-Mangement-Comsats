import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInvoiceTables1758799286128 implements MigrationInterface {
    name = 'AddInvoiceTables1758799286128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "invoice_item" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "price" numeric(10,2) NOT NULL, "subtotal" numeric(10,2) NOT NULL, "invoiceId" integer, "productId" integer, CONSTRAINT "PK_621317346abdf61295516f3cb76" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invoice" ("id" SERIAL NOT NULL, "totalAmount" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "managerId" integer, CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "invoice_item" ADD CONSTRAINT "FK_553d5aac210d22fdca5c8d48ead" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoice_item" ADD CONSTRAINT "FK_e558df60d7d9a3e412ef0bbb844" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD CONSTRAINT "FK_0aa733ec12cd9a4eb2eaaf71f13" FOREIGN KEY ("managerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice" DROP CONSTRAINT "FK_0aa733ec12cd9a4eb2eaaf71f13"`);
        await queryRunner.query(`ALTER TABLE "invoice_item" DROP CONSTRAINT "FK_e558df60d7d9a3e412ef0bbb844"`);
        await queryRunner.query(`ALTER TABLE "invoice_item" DROP CONSTRAINT "FK_553d5aac210d22fdca5c8d48ead"`);
        await queryRunner.query(`DROP TABLE "invoice"`);
        await queryRunner.query(`DROP TABLE "invoice_item"`);
    }

}
