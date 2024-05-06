import { Router } from "express"
import { auth } from "../middlewares/auth"
import {
  deleteUserById,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController"

export const userRouter = Router()

// Users Profile
userRouter.get("/users/profile", auth, getUserProfile)
userRouter.put("/users/profile", auth, updateUserProfile)
userRouter.delete("/users/:id", auth, deleteUserById)
