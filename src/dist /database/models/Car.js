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
exports.Car = void 0;
const typeorm_1 = require("typeorm");
const Brand_1 = require("./Brand");
const Trip_1 = require("./Trip");
const Driver_1 = require("./Driver");
let Car = class Car extends typeorm_1.BaseEntity {
};
exports.Car = Car;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Car.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "number_plate" }),
    __metadata("design:type", String)
], Car.prototype, "numberPlate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "model" }),
    __metadata("design:type", String)
], Car.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "power_engine" }),
    __metadata("design:type", String)
], Car.prototype, "powerEngine", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "seats" }),
    __metadata("design:type", Number)
], Car.prototype, "seats", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "accessible_car" }),
    __metadata("design:type", Boolean)
], Car.prototype, "accessibleCar", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at" }),
    __metadata("design:type", Date)
], Car.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "brand_id" }),
    __metadata("design:type", Number)
], Car.prototype, "brandId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Brand_1.Brand, (brand) => brand.cars),
    (0, typeorm_1.JoinColumn)({ name: "brand_id" }),
    __metadata("design:type", Brand_1.Brand)
], Car.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Driver_1.Driver, (driver) => driver.car),
    __metadata("design:type", Array)
], Car.prototype, "drivers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Trip_1.Trip, (trip) => trip.car),
    __metadata("design:type", Array)
], Car.prototype, "trips", void 0);
exports.Car = Car = __decorate([
    (0, typeorm_1.Entity)("cars")
], Car);
