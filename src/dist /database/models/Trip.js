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
exports.Trip = void 0;
const typeorm_1 = require("typeorm");
const Driver_1 = require("./Driver");
const User_1 = require("./User");
const Car_1 = require("./Car");
let Trip = class Trip extends typeorm_1.BaseEntity {
};
exports.Trip = Trip;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Trip.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id" }),
    __metadata("design:type", Number)
], Trip.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "car_id" }),
    __metadata("design:type", Number)
], Trip.prototype, "carId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "driver_id" }),
    __metadata("design:type", Number)
], Trip.prototype, "driverId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "start_location" }),
    __metadata("design:type", String)
], Trip.prototype, "startLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "destination" }),
    __metadata("design:type", String)
], Trip.prototype, "destination", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "pay" }),
    __metadata("design:type", Boolean)
], Trip.prototype, "pay", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "trip_date" }),
    __metadata("design:type", Date)
], Trip.prototype, "tripDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "trip_start_date" }),
    __metadata("design:type", Date)
], Trip.prototype, "tripStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "trip_finish_date" }),
    __metadata("design:type", Date)
], Trip.prototype, "tripFinishDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Driver_1.Driver, (driver) => driver.trips),
    (0, typeorm_1.JoinColumn)({ name: "driver_id" }),
    __metadata("design:type", Driver_1.Driver)
], Trip.prototype, "driver", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.trips),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", User_1.User)
], Trip.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Car_1.Car, (car) => car.trips),
    (0, typeorm_1.JoinColumn)({ name: "car_id" }),
    __metadata("design:type", Car_1.Car)
], Trip.prototype, "car", void 0);
exports.Trip = Trip = __decorate([
    (0, typeorm_1.Entity)("trips")
], Trip);
