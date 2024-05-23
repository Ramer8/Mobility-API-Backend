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
exports.deleteMoreThanOneDrivers = exports.deleteDriverById = exports.getDrivers = exports.updateDriverProfile = exports.getDriverProfile = void 0;
const Driver_1 = require("../database/models/Driver");
const getDriverProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { driverId } = req.tokenData;
        const driver = yield Driver_1.Driver.findOne({
            where: {
                id: driverId,
            },
            select: {
                id: true,
                driverName: true,
                email: true,
                roleId: true,
                phone: true,
                documents: true,
                score: true,
                driverMessage: true,
                location: true,
                createdAt: true,
            },
        });
        if (!driver) {
            return res.status(404).json({
                success: false,
                message: "Driver not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Driver retrieved successfully",
            data: driver,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Driver can't be retriever successfully",
            error: error,
        });
    }
});
exports.getDriverProfile = getDriverProfile;
const updateDriverProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverId = req.tokenData.driverId;
        const driverUpdated = yield Driver_1.Driver.update({
            id: driverId,
        }, {
            driverName: req.body.driverName,
            phone: req.body.phone,
            documents: req.body.documents,
            location: req.body.location,
            driverMessage: req.body.driverMessage,
            score: req.body.score,
        });
        if (!driverUpdated.affected) {
            return res.status(404).json({
                success: false,
                message: "Driver profile can't updated",
            });
        }
        res.status(200).json({
            success: true,
            message: "Driver updated successfully",
            driverNameUpdated: req.body.driverName,
            phoneUpdated: req.body.phone,
            scoreUpdated: req.body.score,
            driverMessageUpdated: req.body.driverMessage,
            driver: driverUpdated,
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: "Driver can't be updated",
            error: error,
        });
    }
});
exports.updateDriverProfile = updateDriverProfile;
const getDrivers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1; // Default to page 1 if not specified
        const limit = req.query.limit ? parseInt(req.query.limit) : 10; // Default to 10 items per page if not specified
        const skip = (page - 1) * limit;
        const drivers = yield Driver_1.Driver.find({
            order: {
                driverName: "ASC",
            },
            select: {
                id: true,
                driverName: true,
                phone: true,
                documents: true,
                roleId: true,
                carId: true,
                location: true,
                score: true,
                createdAt: true,
            },
            skip,
            take: limit,
        });
        res.status(200).json({
            success: true,
            message: "user retriever successfully",
            data: drivers,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "user can't be retriever successfully",
            error: error,
        });
    }
});
exports.getDrivers = getDrivers;
const deleteDriverById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverId = req.params.id;
        const driverToRemove = yield Driver_1.Driver.findOne({
            where: { id: parseInt(driverId) },
            select: ["id", "driverName", "email", "createdAt", "roleId"],
        });
        if (!driverToRemove) {
            return res.status(404).json({
                success: false,
                message: "Driver can't be deleted because not exist in Data Base",
            });
        }
        if (driverToRemove.roleId === 3) {
            return res.status(403).json({
                success: false,
                message: "This driver can't be deleted",
            });
        }
        const driverDeleted = yield Driver_1.Driver.delete(driverToRemove);
        if (!driverDeleted.affected) {
            return res.status(404).json({
                success: false,
                message: "Driver can't be deleted",
            });
        }
        res.status(200).json({
            success: true,
            message: "Driver deleted successfully",
            data: { driverDeleted, driverToRemove },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Driver can't be deleted",
            error: error,
        });
    }
});
exports.deleteDriverById = deleteDriverById;
const deleteMoreThanOneDrivers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driversId = req.body.driversId;
        const driversToRemove = yield Driver_1.Driver.createQueryBuilder("driver")
            .select([
            "driver.id",
            "driver.driverName",
            "driver.email",
            "driver.createdAt",
            "driver.roleId",
        ])
            .where("driver.id IN (:...driversId)", { driversId })
            .getMany();
        const isSuperAdmin = driversToRemove.find((drivers) => drivers.roleId === 3);
        if (isSuperAdmin) {
            return res.status(500).json({
                success: false,
                message: "One of this drivers can't be deleted",
            });
        }
        if (!driversToRemove.length) {
            return res.status(404).json({
                success: false,
                message: "Driver/s can't be deleted because not exist in Data Base",
            });
        }
        const driverDeleted = yield Driver_1.Driver.delete(driversToRemove);
        res.status(200).json({
            success: true,
            message: "Driver/s deleted successfully",
            data: driverDeleted,
            driversToRemove,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Driver/s can't be deleted",
            error: error,
        });
    }
});
exports.deleteMoreThanOneDrivers = deleteMoreThanOneDrivers;
