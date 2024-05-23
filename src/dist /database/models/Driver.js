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
exports.Driver = void 0;
const typeorm_1 = require("typeorm");
const Role_1 = require("./Role");
const Trip_1 = require("./Trip");
const Car_1 = require("./Car");
let Driver = class Driver extends typeorm_1.BaseEntity {
};
exports.Driver = Driver;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Driver.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "driver_name" }),
    __metadata("design:type", String)
], Driver.prototype, "driverName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "email" }),
    __metadata("design:type", String)
], Driver.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "password" }),
    __metadata("design:type", String)
], Driver.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "role_id" }),
    __metadata("design:type", Number)
], Driver.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "car_id" }),
    __metadata("design:type", Number)
], Driver.prototype, "carId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "phone" }),
    __metadata("design:type", String)
], Driver.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "documents" }),
    __metadata("design:type", String)
], Driver.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "score" }),
    __metadata("design:type", Number)
], Driver.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "driver_message" }),
    __metadata("design:type", String)
], Driver.prototype, "driverMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "location" }),
    __metadata("design:type", String)
], Driver.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at" }),
    __metadata("design:type", Date)
], Driver.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Role_1.Role, (role) => role.drivers),
    (0, typeorm_1.JoinColumn)({ name: "role_id" }),
    __metadata("design:type", Role_1.Role
    ///
    )
], Driver.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Car_1.Car, (car) => car.drivers),
    (0, typeorm_1.JoinColumn)({ name: "car_id" }),
    __metadata("design:type", Car_1.Car)
], Driver.prototype, "car", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Trip_1.Trip, (trip) => trip.driver),
    __metadata("design:type", Array)
], Driver.prototype, "trips", void 0);
exports.Driver = Driver = __decorate([
    (0, typeorm_1.Entity)("drivers")
], Driver);
