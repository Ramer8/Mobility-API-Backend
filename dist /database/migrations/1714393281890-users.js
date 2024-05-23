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
exports.Users1714393281890 = void 0;
const typeorm_1 = require("typeorm");
class Users1714393281890 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable("users");
        });
    }
}
exports.Users1714393281890 = Users1714393281890;
