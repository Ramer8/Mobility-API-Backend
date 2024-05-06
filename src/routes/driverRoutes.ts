import { Router } from "express"
import { auth } from "../middlewares/auth"
import {
  deleteDriverById,
  getDriverProfile,
  getDrivers,
  updateDriverProfile,
} from "../controllers/driverController"
import { isSuperAdmin } from "../middlewares/isSuperAdmin"

export const driverRouter = Router()

// Drivers Profile

driverRouter.get("/drivers/profile", auth, getDriverProfile)
driverRouter.put("/drivers/profile", auth, updateDriverProfile)

// Get All Drivers
driverRouter.get("/drivers", auth, getDrivers)

// Super Admin Driver Routes
driverRouter.delete("/drivers/:id", auth, isSuperAdmin, deleteDriverById)
// driverRouter.delete("/drivers/", auth, isSuperAdmin, deleteMoreThanOneDrivers)
