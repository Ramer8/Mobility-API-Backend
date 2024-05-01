import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Brands1714389965600 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "brands",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
          {
            name: "nationality",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
        ],
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("brands")
  }
}
