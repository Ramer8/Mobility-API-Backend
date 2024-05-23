"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = require("./routes/authRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const driverRoutes_1 = require("./routes/driverRoutes");
const tripRoutes_1 = require("./routes/tripRoutes");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.get("/alive", (req, res) => {
    res.send("Server is alive");
});
exports.app.get("/healthy", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
    });
});
// auth Users & Drivers
exports.app.use("/", authRoutes_1.authRouter);
// Users
exports.app.use("/", userRoutes_1.userRouter);
// Drivers
exports.app.use("/", driverRoutes_1.driverRouter);
// Trips
exports.app.use("/", tripRoutes_1.tripRouter);
