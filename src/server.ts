import express from "express"
import dotenv from "dotenv"
import { Request, Response } from "express"

// links the .env folder
dotenv.config()

// runs server connection
const app = express()

// parses responses to .json)
app.use(express.json())

// sets up the connection port
const PORT = process.env.PORT || 4002

// server is up and listening to any upcomming request
app.listen(5500, () => console.log("Servidor online at port 5500"))

// testing request - 'Hello world' means we are ready to go!
app.get("/", (req: Request, res: Response) => {
  res.send("Server is alive")
})

app.get("/healthy", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  })
})
