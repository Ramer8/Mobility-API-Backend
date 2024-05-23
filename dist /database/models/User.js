"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Role_1 = require("./Role");
const Trip_1 = require("./Trip");
let User = class User extends typeorm_1.BaseEntity {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_name" }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "email" }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "password" }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "phone" }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "payment" }),
    __metadata("design:type", String)
], User.prototype, "payment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "address" }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "work_address" }),
    __metadata("design:type", String)
], User.prototype, "workAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "saved_address" }),
    __metadata("design:type", String)
], User.prototype, "savedAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "documents" }),
    __metadata("design:type", String)
], User.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "message" }),
    __metadata("design:type", String)
], User.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "role_id" }),
    __metadata("design:type", Number)
], User.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "location" }),
    __metadata("design:type", String)
], User.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at" }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Role_1.Role, (role) => role.users),
    (0, typeorm_1.JoinColumn)({ name: "role_id" }),
    __metadata("design:type", Role_1.Role
    ///
    )
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Trip_1.Trip, (trip) => trip.user),
    __metadata("design:type", Array)
], User.prototype, "trips", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)("users")
], User);