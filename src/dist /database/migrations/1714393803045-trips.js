"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trips1714393803045 = void 0;
const typeorm_1 = require("typeorm");
class Trips1714393803045 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "trips",
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
                        isNullable: true,
                    },
                    {
                        name: "car_id",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "driver_id",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "start_location",
                        type: "varchar",
                        length: "100",
                        // isNullable: false,
                        isNullable: true,
                    },
                    {
                        name: "destination",
                        type: "varchar",
                        length: "100",
                        // isNullable: false,
                        isNullable: true,
                    },
                    {
                        name: "pay",
                        type: "boolean",
                        isNullable: true,
                        default: false,
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
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable("trips");
        });
    }
}
exports.Trips1714393803045 = Trips1714393803045;
