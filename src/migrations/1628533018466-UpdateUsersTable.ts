import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUsersTable1628533018466 implements MigrationInterface {
    name = 'UpdateUsersTable1628533018466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_pokemons" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "pokemonId" integer NOT NULL, CONSTRAINT "PK_6d55d403210e0f141a18d79d387" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pokemons" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "number" integer NOT NULL, "image" character varying NOT NULL, "weight" integer NOT NULL, "height" integer NOT NULL, "baseExp" integer NOT NULL, "description" character varying NOT NULL, "inMyPokemons" boolean NOT NULL, CONSTRAINT "PK_a3172290413af616d9cfa1fdc9a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users_pokemons" ADD CONSTRAINT "FK_576c5d6475f397b4a24cf58e6be" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_pokemons" ADD CONSTRAINT "FK_eb025b13aee5e0ce5a745196305" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_pokemons" DROP CONSTRAINT "FK_eb025b13aee5e0ce5a745196305"`);
        await queryRunner.query(`ALTER TABLE "users_pokemons" DROP CONSTRAINT "FK_576c5d6475f397b4a24cf58e6be"`);
        await queryRunner.query(`DROP TABLE "pokemons"`);
        await queryRunner.query(`DROP TABLE "users_pokemons"`);
    }

}
