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
exports.updateMyTripWithToken = exports.deleteTripById = exports.deleteMoreThanOneTrips = exports.getAllTripsSuper_admin = exports.recoverTripWithId = exports.showMyTripsWithToken = exports.createTripWithToken = void 0;
const Trip_1 = require("../database/models/Trip");
const User_1 = require("../database/models/User");
const Driver_1 = require("../database/models/Driver");
const createTripWithToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.userId;
        const { driverId, tripStartDate, destination, startLocation } = req.body;
        const dataDriver = yield Driver_1.Driver.find({
            where: {
                id: driverId,
            },
            select: {
                carId: true,
            },
        });
        const newtrip = yield Trip_1.Trip.create({
            userId: userId,
            startLocation: startLocation,
            tripStartDate: tripStartDate,
            destination: destination,
            driverId: driverId,
            carId: dataDriver[0].carId,
        }).save();
        res.status(201).json({
            success: true,
            message: "Trip created successfuly",
            data: newtrip,
        });
    }
    catch (error) {
        res.status(500).json({
            succes: false,
            message: "Can't create trip,",
            error: error,
        });
    }
});
exports.createTripWithToken = createTripWithToken;
const showMyTripsWithToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.userId;
        const user = yield User_1.User.find({
            where: {
                id: userId,
            },
            select: {
                trips: true,
                id: true,
                userName: true,
                location: true,
            },
        });
        const trip = yield Trip_1.Trip.find({
            order: {
                tripDate: "ASC",
            },
            where: {
                userId: userId,
            },
            relations: {
                driver: true,
            },
            select: {
                tripDate: true,
                id: true,
                driver: {
                    driverName: true,
                    carId: true,
                    id: true,
                },
            },
        });
        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip/s not found",
                error: Error,
            });
        }
        res.status(200).json({
            success: true,
            message: "Trip retrieved successfuly",
            user,
            trip,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Trip can't be retriever successfully",
            error: error,
        });
    }
});
exports.showMyTripsWithToken = showMyTripsWithToken;
const recoverTripWithId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tripId = req.params.id;
        const { userId } = req.tokenData;
        const trip = yield Trip_1.Trip.find({
            where: {
                userId: userId,
                id: parseInt(tripId),
            },
            relations: {
                driver: true,
                car: true,
                user: true,
            },
            select: {
                tripDate: true,
                startLocation: true,
                destination: true,
                tripFinishDate: true,
                tripStartDate: true,
                car: {
                    model: true,
                    seats: true,
                    powerEngine: true,
                    numberPlate: true,
                    accessibleCar: true,
                    brandId: true,
                },
                driver: {
                    driverName: true,
                    carId: true,
                    score: true,
                    driverMessage: true,
                },
                user: {
                    userName: true,
                    payment: true,
                },
            },
        });
        if (!trip.length) {
            return res.status(404).json({
                success: false,
                message: "Trip id not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Trip id retrieved successfuly",
            data: trip,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Trip id can't be retriever successfully",
            error: error,
        });
    }
});
exports.recoverTripWithId = recoverTripWithId;
const getAllTripsSuper_admin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield Trip_1.Trip.find({
        order: {
            tripDate: "ASC",
        },
        relations: {
            driver: true,
            car: true,
            user: true,
        },
        select: {
            tripDate: true,
            id: true,
            startLocation: true,
            destination: true,
            tripFinishDate: true,
            tripStartDate: true,
            car: {
                model: true,
                seats: true,
                powerEngine: true,
                numberPlate: true,
                accessibleCar: true,
            },
            driver: {
                driverName: true,
                carId: true,
            },
            user: {
                userName: true,
                payment: true,
            },
        },
    });
    if (!trip) {
        return res.status(404).json({
            success: false,
            message: "trip not found",
        });
    }
    return res.status(200).json({
        success: true,
        message: "trip showing successfuly",
        data: trip,
    });
});
exports.getAllTripsSuper_admin = getAllTripsSuper_admin;
const deleteMoreThanOneTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tripsId = req.body.tripsId;
        const tripsToRemove = yield Trip_1.Trip.createQueryBuilder("trip")
            .select([
            "trip.id",
            "trip.startLocation",
            "trip.destination",
            "trip.tripDate",
            "trip.userId",
            "trip.carId",
            "trip.driverId",
        ])
            .where("trip.id IN (:...tripsId)", { tripsId })
            .getMany();
        // const isSuperAdmin = tripsToRemove.find(
        //   (users) => users.roleId === 3 || users.roleId === 2
        // )
        // if (isSuperAdmin) {
        //   return res.status(500).json({
        //     success: false,
        //     message: "One of this users can't be deleted",
        //   })
        // }
        if (!tripsToRemove.length) {
            return res.status(404).json({
                success: false,
                message: "Trip/s can't be deleted because not exist in Data Base",
            });
        }
        const tripsDeleted = yield Trip_1.Trip.delete(tripsToRemove);
        res.status(200).json({
            success: true,
            message: "Trips/s deleted successfully",
            data: tripsDeleted,
            tripsToRemove,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Trips/s can't be deleted",
            error: error,
        });
    }
});
exports.deleteMoreThanOneTrips = deleteMoreThanOneTrips;
const deleteTripById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.userId;
        const tripToRemove = yield Trip_1.Trip.findOneBy({
            userId: userId,
            id: parseInt(req.params.id),
        });
        if (!tripToRemove) {
            return res.status(404).json({
                success: false,
                message: "trip can't be deleted because not exist in Data Base",
            });
        }
        const tripDeleted = yield Trip_1.Trip.remove(tripToRemove);
        return res.status(200).json({
            success: true,
            message: "Trip deleted",
            tripDeleted: tripDeleted,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Trip can't be deleted",
            error: error,
        });
    }
});
exports.deleteTripById = deleteTripById;
const updateMyTripWithToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tripDate, trip_id, startLocation, destination, driverId, tripStartDate, tripFinishDate, carId, } = req.body;
        const userId = req.tokenData.userId;
        const trip = yield Trip_1.Trip.find({
            where: {
                userId: userId,
                id: parseInt(trip_id), // busca la cita a actualizar le paso id q quiero actualizar
            },
            relations: {
                driver: true,
                user: true,
                // car: true,
            },
            select: {
                tripDate: true,
                id: true,
                driver: {
                    driverName: true,
                    carId: true,
                    id: true,
                },
                user: {
                    userName: true,
                    payment: true,
                },
                // car: {
                //   model: true,
                //   numberPlate: true,
                // },
            },
        });
        console.log(trip);
        if (!trip.length) {
            return res.status(404).json({
                success: false,
                message: "trip/s not found",
                error: Error,
            });
        }
        const tripToUpdate = yield Trip_1.Trip.update({
            userId: userId,
            id: trip_id,
        }, {
            tripDate: tripDate,
            startLocation: startLocation,
            destination: destination,
            driverId: driverId,
            tripStartDate: tripStartDate,
            tripFinishDate: tripFinishDate,
            carId: carId,
        });
        if (!tripToUpdate.affected) {
            return res.status(404).json({
                success: false,
                message: "trip/s not found",
                error: Error,
            });
        }
        console.log(tripToUpdate, "lo que cambio");
        res.status(200).json({
            success: true,
            message: "trip updated successfuly",
            trip,
            tripDate: tripDate,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "trip can't be updated",
            error: error,
        });
    }
});
exports.updateMyTripWithToken = updateMyTripWithToken;
