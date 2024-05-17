import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Users1714393281890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
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
            name: "password",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "phone",
            type: "varchar",
            length: "30",
            isNullable: true,
          },
          {
            name: "payment",
            type: "varchar",
            length: "255",
            default: "'cash'",
            isNullable: true,
          },
          {
            name: "address",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "work_address",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "saved_address",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "documents",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "message",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "role_id",
            type: "int",
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
    await queryRunner.dropTable("users")
  }
}
