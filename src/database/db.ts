import "dotenv/config"
import "reflect-metadata"
import { DataSource } from "typeorm"

//Migrations
import { Brand1714389965600 } from "./migrations/1714389965600-brand"
import { Cars1714389965602 } from "./migrations/1714389965602-cars"
import { Roles1714392254828 } from "./migrations/1714392254828-roles"
import { Drivers1714392337856 } from "./migrations/1714392337856-drivers"
import { Users1714393281890 } from "./migrations/1714393281890-users"
import { Trip1714393803045 } from "./migrations/1714393803045-trip"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "",
  migrations: [
    Brand1714389965600,
    Cars1714389965602,
    Roles1714392254828,
    Drivers1714392337856,
    Users1714393281890,
    Trip1714393803045,
  ],
  synchronize: false,
  logging: false,
})
