import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Trip1714393803045 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "trip",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "car_id",
            type: "int",
          },
          {
            name: "driver_id",
            type: "int",
          },
          {
            name: "start_location",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "destination",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "trip_date",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
          {
            name: "trip_start_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "trip_finish_date",
            type: "timestamp",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["car_id"],
            referencedTableName: "cars",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["driver_id"],
            referencedTableName: "drivers",
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
