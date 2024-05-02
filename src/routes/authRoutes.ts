import { Router } from "express"

export const authRouter = Router()

import { loginUser, registerUser } from "../controllers/authController"

// Authorisation:
authRouter.post("/auth/register", registerUser)
authRouter.post("/auth/login", loginUser)
