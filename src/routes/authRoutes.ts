import { Router } from "express"
import { loginUser, registerUser } from "../controllers/authController"

export const authRouter = Router()

// Authorization:
authRouter.post("/auth/register", registerUser)
authRouter.post("/auth/login", loginUser)
