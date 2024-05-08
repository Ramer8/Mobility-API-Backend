import { Router } from "express"
import {
  createTripWithToken,
  deleteTripById,
  getAllTripsSuper_admin,
  recoverTripWithId,
  showMyTripsWithToken,
  updateMyTripWithToken,
} from "../controllers/tripController"
import { auth } from "../middlewares/auth"
import { isSuperAdmin } from "../middlewares/isSuperAdmin"

export const tripRouter = Router()

// Create trip:
tripRouter.post("/trips", auth, createTripWithToken)
// Delete trip by id (superAdmin)
tripRouter.delete("/trips/:id", auth, isSuperAdmin, deleteTripById)
// Get my user Trip
tripRouter.get("/trips", auth, showMyTripsWithToken)
// Get all Trips
tripRouter.get("/trips/all", auth, isSuperAdmin, getAllTripsSuper_admin)

// Update Trip with token
tripRouter.put("/trips", auth, updateMyTripWithToken)
tripRouter.put("/trips/:id", auth, recoverTripWithId)
// // Driver Authorization
// authRouter.post("/auth/drivers/register", registerDriver)
// authRouter.post("/auth/drivers/login", loginDriver)
