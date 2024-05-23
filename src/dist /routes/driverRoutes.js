"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const driverController_1 = require("../controllers/driverController");
const isSuperAdmin_1 = require("../middlewares/isSuperAdmin");
exports.driverRouter = (0, express_1.Router)();
// Drivers Profile
exports.driverRouter.get("/drivers/profile", auth_1.auth, driverController_1.getDriverProfile);
exports.driverRouter.put("/drivers/profile", auth_1.auth, driverController_1.updateDriverProfile);
// Get All Drivers with pagination
exports.driverRouter.get("/drivers", auth_1.auth, isSuperAdmin_1.isSuperAdmin, driverController_1.getDrivers);
// Super Admin Driver Routes
exports.driverRouter.delete("/drivers/:id", auth_1.auth, isSuperAdmin_1.isSuperAdmin, driverController_1.deleteDriverById);
exports.driverRouter.delete("/drivers/", auth_1.auth, isSuperAdmin_1.isSuperAdmin, driverController_1.deleteMoreThanOneDrivers);
