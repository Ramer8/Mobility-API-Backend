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
exports.Cars1714389965602 = void 0;
const typeorm_1 = require("typeorm");
class Cars1714389965602 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
                        name: "number_plate",
                        type: "varchar",
                        length: "40",
                        isNullable: true,
                    },
                    {
                        name: "model",
                        type: "varchar",
                        length: "100",
                        isNullable: true,
                    },
                    {
                        name: "power_engine",
                        type: "varchar",
                        length: "40",
                        isNullable: true,
                    },
                    {
                        name: "seats",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "accessible_car",
                        type: "boolean",
                        isNullable: true,
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
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable("cars");
        });
    }
}
exports.Cars1714389965602 = Cars1714389965602;
