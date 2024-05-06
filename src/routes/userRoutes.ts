import { Router } from "express"
import { auth } from "../middlewares/auth"
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController"

export const userRouter = Router()

// Profile
// authRouter.post("/profile", auth, getUserProfile)
userRouter.get("/users/profile", auth, getUserProfile)
userRouter.put("/users/profile", auth, updateUserProfile)
