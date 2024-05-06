import express from "express"
import cors from "cors"

import { authRouter } from "./routes/authRoutes"
import { userRouter } from "./routes/userRoutes"
import { driverRouter } from "./routes/driverRoutes"

export const app = express()
app.use(express.json())
app.use(cors())

app.get("/alive", (req, res) => {
  res.send("Server is alive")
})
app.get("/healthy", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  })
})

// auth Users & Drivers
app.use("/", authRouter)

// Users
app.use("/", userRouter)

// Drivers
app.use("/", driverRouter)
