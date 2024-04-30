import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Cars1714389965602 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cars",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "model",
            type: "varchar",
            length: "100",
          },
          {
            name: "power_engine",
            type: "varchar",
            length: "100",
          },
          {
            name: "seats",
            type: "int",
          },
          {
            name: "accessible_car",
            type: "boolean",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
            onUpdate: "now()",
          },
          {
            name: "brand_id",
            type: "int",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["brand_id"],
            referencedTableName: "brands",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cars")
  }
}
