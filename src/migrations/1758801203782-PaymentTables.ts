import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentTables1758801203782 implements MigrationInterface {
    name = 'PaymentTables1758801203782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."payment_method_enum" AS ENUM('CASH', 'ONLINE')`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" SERIAL NOT NULL, "method" "public"."payment_method_enum" NOT NULL, "amount" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "invoiceId" integer, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_87223c7f1d4c2ca51cf69927844" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_87223c7f1d4c2ca51cf69927844"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TYPE "public"."payment_method_enum"`);
    }

}
