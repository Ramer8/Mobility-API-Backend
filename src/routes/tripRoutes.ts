import { Router } from "express"
import {
  createTripWithToken,
  deleteTripById,
  showMyTripsWithToken,
} from "../controllers/tripController"
import { auth } from "../middlewares/auth"

export const tripRouter = Router()

// Create trip:
tripRouter.post("/trips", auth, createTripWithToken)

tripRouter.delete("/trips/:id", auth, deleteTripById)
tripRouter.get("/trips", auth, showMyTripsWithToken)
// // Driver Authorization
// authRouter.post("/auth/drivers/register", registerDriver)
// authRouter.post("/auth/drivers/login", loginDriver)
