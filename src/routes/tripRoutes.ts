import { Router } from "express"
import { createTripWithToken } from "../controllers/tripController"
import { auth } from "../middlewares/auth"

export const tripRouter = Router()

// Create trip:
tripRouter.post("/trips", auth, createTripWithToken)

// authRouter.post("/auth/login", loginUser)
// // Driver Authorization
// authRouter.post("/auth/drivers/register", registerDriver)
// authRouter.post("/auth/drivers/login", loginDriver)
