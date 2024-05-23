"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
//Migrations
const _1714389965600_brands_1 = require("./migrations/1714389965600-brands");
const _1714389965602_cars_1 = require("./migrations/1714389965602-cars");
const _1714392254828_roles_1 = require("./migrations/1714392254828-roles");
const _1714392337856_drivers_1 = require("./migrations/1714392337856-drivers");
const _1714393281890_users_1 = require("./migrations/1714393281890-users");
const _1714393803045_trips_1 = require("./migrations/1714393803045-trips");
const Role_1 = require("./models/Role");
const User_1 = require("./models/User");
const Car_1 = require("./models/Car");
const Driver_1 = require("./models/Driver");
const Trip_1 = require("./models/Trip");
const Brand_1 = require("./models/Brand");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "",
    entities: [Brand_1.Brand, Car_1.Car, Role_1.Role, Driver_1.Driver, User_1.User, Trip_1.Trip],
    migrations: [
        _1714389965600_brands_1.Brands1714389965600,
        _1714389965602_cars_1.Cars1714389965602,
        _1714392254828_roles_1.Roles1714392254828,
        _1714392337856_drivers_1.Drivers1714392337856,
        _1714393281890_users_1.Users1714393281890,
        _1714393803045_trips_1.Trips1714393803045,
    ],
    synchronize: false,
    logging: false,
});
