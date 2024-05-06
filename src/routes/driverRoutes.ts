import { Router } from "express"
import { auth } from "../middlewares/auth"
import {
  getDriverProfile,
  updateDriverProfile,
} from "../controllers/driverController"

export const driverRouter = Router()

// Drivers Profile

driverRouter.get("/drivers/profile", auth, getDriverProfile)
driverRouter.put("/drivers/profile", auth, updateDriverProfile)
