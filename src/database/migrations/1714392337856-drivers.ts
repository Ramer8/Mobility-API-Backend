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
            length: "100",
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
            type: "varchar",
            length: "30",
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
            type: "varchar",
            length: "100",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
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
