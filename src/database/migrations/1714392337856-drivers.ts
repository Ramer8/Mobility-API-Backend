import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Drivers1714392337856 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "drivers",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_name",
            type: "varchar",
            length: "255",
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "password_hash",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "role_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "phone",
            type: "int",
            isNullable: true,
          },
          {
            name: "documents",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "score",
            type: "int",
            isNullable: true,
          },
          {
            name: "message",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "location",
            type: "number",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
            onUpdate: "now()",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["role_id"],
            referencedTableName: "roles",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("drivers")
  }
}
