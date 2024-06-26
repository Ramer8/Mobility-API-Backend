import "dotenv/config"

import { app } from "./app"
import { AppDataSource } from "./database/db"

const PORT = process.env.PORT || 5500

const startServer = () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("database connected")
      app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`)
      })
    })
    .catch((error: any) => {
      console.log("error")
    })
}

startServer()
