import { Router } from "express"
import { auth } from "../middlewares/auth"
import {
  getDriverProfile,
  getDrivers,
  updateDriverProfile,
} from "../controllers/driverController"

export const driverRouter = Router()

// Drivers Profile

driverRouter.get("/drivers/profile", auth, getDriverProfile)
driverRouter.put("/drivers/profile", auth, updateDriverProfile)

// Get All Drivers
driverRouter.get("/drivers", auth, getDrivers)
