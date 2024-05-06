import { Router } from "express"
import {
  loginUser,
  registerDriver,
  registerUser,
} from "../controllers/authController"

export const authRouter = Router()

// Authorization:
authRouter.post("/auth/register", registerUser)
authRouter.post("/auth/login", loginUser)
// Driver Authorization
authRouter.post("/auth/drivers/register", registerDriver)
// authRouter.post("/auth/drivers/login", loginDriver)
