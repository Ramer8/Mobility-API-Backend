"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripRouter = void 0;
const express_1 = require("express");
const tripController_1 = require("../controllers/tripController");
const auth_1 = require("../middlewares/auth");
const isSuperAdmin_1 = require("../middlewares/isSuperAdmin");
exports.tripRouter = (0, express_1.Router)();
// Create trip:
exports.tripRouter.post("/trips", auth_1.auth, tripController_1.createTripWithToken);
// Delete trip by id (superAdmin)
exports.tripRouter.delete("/trips/:id", auth_1.auth, tripController_1.deleteTripById);
// Delete more than one Trip (superAdmin)
exports.tripRouter.delete("/trips/", auth_1.auth, isSuperAdmin_1.isSuperAdmin, tripController_1.deleteMoreThanOneTrips);
// Get my user Trip
exports.tripRouter.get("/trips", auth_1.auth, tripController_1.showMyTripsWithToken);
// Get all Trips
exports.tripRouter.get("/trips/all", auth_1.auth, isSuperAdmin_1.isSuperAdmin, tripController_1.getAllTripsSuper_admin);
// Update Trip with token
exports.tripRouter.put("/trips", auth_1.auth, tripController_1.updateMyTripWithToken);
exports.tripRouter.put("/trips/:id", auth_1.auth, tripController_1.recoverTripWithId);
