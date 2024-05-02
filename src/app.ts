import express from "express"
import cors from "cors"

// import { roleRouter } from "./routes/roleRoutes"
import { authRouter } from "./routes/authRoutes"
// import { userRouter } from "./routes/userRoutes"

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

// app.use("/", roleRouter)
app.use("/", authRouter)
// app.use("/", userRouter)
