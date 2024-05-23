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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const faker_1 = require("@faker-js/faker");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Role_1 = require("../models/Role");
const User_1 = require("../models/User");
const Driver_1 = require("../models/Driver");
const Car_1 = require("../models/Car");
const Brand_1 = require("../models/Brand");
// DROP DATABASE TAXI;
// CREATE DATABASE TAXI;
// USE TAXI;
const roleSeedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.AppDataSource.initialize();
        const roleUser = new Role_1.Role();
        roleUser.title = "user";
        yield roleUser.save();
        roleUser.id = 1;
        const roleAdmin = new Role_1.Role();
        roleAdmin.title = "admin";
        roleUser.id = 2;
        yield roleAdmin.save();
        const roleSuperAdmin = new Role_1.Role();
        roleSuperAdmin.title = "super_admin";
        roleUser.id = 3;
        yield roleSuperAdmin.save();
        console.log("----------------------------");
        console.log("--Roles saved successfully--");
        console.log("----------------------------");
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield db_1.AppDataSource.destroy();
    }
});
//number of fake users we want to populate DB with
let num_users = 20;
let num_drivers = 5;
let num_cars = 6;
let fakeName;
// create false users to populate DB (with Faker)
const generateFakeUsers = () => {
    const user = new User_1.User();
    fakeName = faker_1.faker.person.firstName() + " " + faker_1.faker.person.lastName();
    user.userName = fakeName;
    let arrayName = fakeName.split(/(?=[A-Z])/);
    user.email = arrayName[0].trim() + arrayName[1] + "@gmail.com";
    user.phone = faker_1.faker.phone.number();
    const randomNumber = Math.random();
    user.payment = randomNumber < 0.5 ? "debit" : "credit";
    //
    // Hardcode a hashed password
    // user.password = "$2b$08$Rj.Etm9wcVccDkV6jM8kM.fUFNgDDHO0fHCNWcKuGWcA4lZpXPsMO" // 123456
    user.password = bcrypt_1.default.hashSync(`123456`, 8);
    // user.password = bcrypt.hashSync(`${fakeName}`, 8)
    user.role = new Role_1.Role();
    user.role.id = 1;
    return user;
};
const userSeedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.AppDataSource.initialize();
        // Hardcoded superadmin
        const superadmin = new User_1.User();
        superadmin.userName = "Super";
        superadmin.email = "super@super.com";
        superadmin.password =
            "$2b$08$Rj.Etm9wcVccDkV6jM8kM.fUFNgDDHO0fHCNWcKuGWcA4lZpXPsMO"; // 123456
        superadmin.role = new Role_1.Role();
        superadmin.role.id = 3;
        let randomNumber = Math.random();
        superadmin.payment = randomNumber < 0.5 ? "debit" : "credit";
        superadmin.save();
        const user = new User_1.User();
        user.userName = "user";
        user.email = "user@user.com";
        user.password =
            "$2b$08$Rj.Etm9wcVccDkV6jM8kM.fUFNgDDHO0fHCNWcKuGWcA4lZpXPsMO"; // 123456
        user.role = new Role_1.Role();
        user.role.id = 1;
        randomNumber = Math.random();
        user.payment = randomNumber < 0.5 ? "debit" : "credit";
        user.save();
        const fakeUsers = Array.from({ length: num_users - 2 }, generateFakeUsers);
        yield User_1.User.save(fakeUsers);
        console.log("---------------------------");
        console.log("---Users saved correctly---");
        console.log("---------------------------");
    }
    catch (error) {
        console.log(error);
    }
    finally {
        if (db_1.AppDataSource) {
            yield db_1.AppDataSource.destroy();
        }
    }
});
// Generate Fake Drivers
const generateFakeDrivers = () => {
    const driver = new Driver_1.Driver();
    fakeName = faker_1.faker.person.firstName() + " " + faker_1.faker.person.lastName();
    driver.driverName = fakeName;
    let arrayName = fakeName.split(/(?=[A-Z])/);
    driver.email = arrayName[0].trim() + arrayName[1] + "@gmail.com";
    driver.phone = faker_1.faker.phone.number();
    driver.password = bcrypt_1.default.hashSync(`123456`, 8);
    driver.role = new Role_1.Role();
    driver.carId = Math.floor(Math.random() * num_cars + 1);
    driver.role.id = 1;
    driver.score = Math.floor(Math.random() * 5 + 1);
    return driver;
};
const driverSeedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.AppDataSource.initialize();
        // Hardcoded superadmin
        const superadmin = new Driver_1.Driver();
        superadmin.driverName = "Super";
        superadmin.email = "super@super.com";
        superadmin.password =
            "$2b$08$Rj.Etm9wcVccDkV6jM8kM.fUFNgDDHO0fHCNWcKuGWcA4lZpXPsMO"; // 123456
        superadmin.role = new Role_1.Role();
        superadmin.carId = Math.floor(Math.random() * num_cars + 1);
        superadmin.score = Math.floor(Math.random() * 5 + 1);
        superadmin.role.id = 3;
        superadmin.save();
        // Fake drivers (with role_id = 1 by default)
        const fakeDrivers = Array.from({ length: num_drivers }, generateFakeDrivers);
        yield Driver_1.Driver.save(fakeDrivers);
        console.log("-----------------------------");
        console.log("---Drivers saved correctly---");
        console.log("-----------------------------");
    }
    catch (error) {
        console.log(error);
    }
    finally {
        if (db_1.AppDataSource) {
            yield db_1.AppDataSource.destroy();
        }
    }
});
const generateFakeBrands = () => {
    const brand = new Brand_1.Brand();
    brand.name = faker_1.faker.vehicle.manufacturer();
    return brand;
};
const brandSeedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.AppDataSource.initialize();
        const fakeBrand = Array.from({ length: num_cars }, generateFakeBrands);
        yield Brand_1.Brand.save(fakeBrand);
        console.log("--------------------------------");
        console.log("----Brands saved correctly------");
        console.log("--------------------------------");
    }
    catch (error) {
        console.log(error);
    }
    finally {
        if (db_1.AppDataSource) {
            yield db_1.AppDataSource.destroy();
        }
    }
});
const generateFakeCars = () => {
    const car = new Car_1.Car();
    faker_1.faker.vehicle.vehicle();
    car.model = faker_1.faker.vehicle.vehicle();
    car.powerEngine = faker_1.faker.vehicle.fuel();
    const randomNumber = Math.random();
    car.seats = randomNumber < 0.5 ? 4 : 6;
    car.accessibleCar = car.seats === 6 ? true : false;
    car.numberPlate = faker_1.faker.vehicle.vrm();
    car.brandId = Math.floor(Math.random() * num_cars + 1);
    return car;
};
const carSeedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.AppDataSource.initialize();
        const fakeCars = Array.from({ length: num_cars }, generateFakeCars);
        yield Car_1.Car.save(fakeCars);
        console.log("-----------------------------");
        console.log("----Cars saved correctly-----");
        console.log("-----------------------------");
    }
    catch (error) {
        console.log(error);
    }
    finally {
        if (db_1.AppDataSource) {
            yield db_1.AppDataSource.destroy();
        }
    }
});
const startSeeders = () => __awaiter(void 0, void 0, void 0, function* () {
    yield roleSeedDatabase();
    yield userSeedDatabase();
    yield brandSeedDatabase();
    yield carSeedDatabase();
    yield driverSeedDatabase();
});
startSeeders();
