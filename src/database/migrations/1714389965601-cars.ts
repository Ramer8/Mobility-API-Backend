import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Cars1714389965601 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
          referencedTableName: "brand",
          referencedColumnNames: ["id"],
          onDelete: "CASCADE",
        },
      ],
    })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cars")
  }
}
