import { Router } from "express"
import { auth } from "../middlewares/auth"
import {
  deleteMoreThanOneUsers,
  deleteUserById,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController"
import { isSuperAdmin } from "../middlewares/isSuperAdmin"

export const userRouter = Router()

// Users Profile
userRouter.get("/users/profile", auth, getUserProfile)
userRouter.put("/users/profile", auth, updateUserProfile)

// Super Admin User Routes
userRouter.delete("/users/:id", auth, isSuperAdmin, deleteUserById)
userRouter.delete("/users/", auth, isSuperAdmin, deleteMoreThanOneUsers)
