import "dotenv/config"
import "reflect-metadata"
import { DataSource } from "typeorm"

//Migrations
import { Brands1714389965600 } from "./migrations/1714389965600-brands"
import { Cars1714389965602 } from "./migrations/1714389965602-cars"
import { Roles1714392254828 } from "./migrations/1714392254828-roles"
import { Drivers1714392337856 } from "./migrations/1714392337856-drivers"
import { Users1714393281890 } from "./migrations/1714393281890-users"
import { Trips1714393803045 } from "./migrations/1714393803045-trips"
import { Role } from "./models/Role"
import { User } from "./models/User"
import { Car } from "./models/Car"
import { Driver } from "./models/Driver"
import { Trip } from "./models/Trip"
import { Brand } from "./models/Brand"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "",
  entities: [Brand, Car, Role, Driver, User, Trip],
  migrations: [
    Brands1714389965600,
    Cars1714389965602,
    Roles1714392254828,
    Drivers1714392337856,
    Users1714393281890,
    Trips1714393803045,
  ],
  synchronize: false,
  logging: false,
})
