"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
exports.authRouter = (0, express_1.Router)();
// Authorization:
exports.authRouter.post("/auth/register", authController_1.registerUser);
exports.authRouter.post("/auth/login", authController_1.loginUser);
// Driver Authorization
exports.authRouter.post("/auth/drivers/register", authController_1.registerDriver);
exports.authRouter.post("/auth/drivers/login", authController_1.loginDriver);
