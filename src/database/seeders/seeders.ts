import { AppDataSource } from "../db"
import { faker } from "@faker-js/faker"
import bcrypt from "bcrypt"
import { Role } from "../models/Role"
import { User } from "../models/User"
import { Driver } from "../models/Driver"
import { Car } from "../models/Car"
import { Brand } from "../models/Brand"

// DROP DATABASE TAXI;
// CREATE DATABASE TAXI;
// USE TAXI;
const roleSeedDatabase = async () => {
  try {
    await AppDataSource.initialize()

    const roleUser = new Role()
    roleUser.title = "user"
    await roleUser.save()
    roleUser.id = 1
    const roleAdmin = new Role()
    roleAdmin.title = "admin"
    roleUser.id = 2
    await roleAdmin.save()

    const roleSuperAdmin = new Role()
    roleSuperAdmin.title = "super_admin"
    roleUser.id = 3
    await roleSuperAdmin.save()

    console.log("----------------------------")
    console.log("--Roles saved successfully--")
    console.log("----------------------------")
  } catch (error) {
    console.log(error)
  } finally {
    await AppDataSource.destroy()
  }
}
//number of fake users we want to populate DB with
let num_users = 20
let num_drivers = 5
let num_cars = 6
let fakeName
// create false users to populate DB (with Faker)
const generateFakeUsers = () => {
  const user = new User()
  fakeName = faker.person.firstName() + " " + faker.person.lastName()
  user.userName = fakeName
  let arrayName = fakeName.split(/(?=[A-Z])/)

  user.email = arrayName[0].trim() + arrayName[1] + "@gmail.com"
  user.phone = faker.phone.number()
  const randomNumber = Math.random()
  user.payment = randomNumber < 0.5 ? "debit" : "credit"
  //

  // Hardcode a hashed password
  // user.password = "$2b$08$Rj.Etm9wcVccDkV6jM8kM.fUFNgDDHO0fHCNWcKuGWcA4lZpXPsMO" // 123456
  user.password = bcrypt.hashSync(`123456`, 8)
  // user.password = bcrypt.hashSync(`${fakeName}`, 8)
  user.role = new Role()
  user.role.id = 1
  return user
}

const userSeedDatabase = async () => {
  try {
    await AppDataSource.initialize()

    // Hardcoded superadmin
    const superadmin = new User()
    superadmin.userName = "Super"
    superadmin.email = "super@super.com"
    superadmin.password =
      "$2b$08$Rj.Etm9wcVccDkV6jM8kM.fUFNgDDHO0fHCNWcKuGWcA4lZpXPsMO" // 123456
    superadmin.role = new Role()
    superadmin.role.id = 3
    let randomNumber = Math.random()
    superadmin.payment = randomNumber < 0.5 ? "debit" : "credit"

    superadmin.save()

    const user = new User()
    user.userName = "user"
    user.email = "user@user.com"
    user.password =
      "$2b$08$Rj.Etm9wcVccDkV6jM8kM.fUFNgDDHO0fHCNWcKuGWcA4lZpXPsMO" // 123456
    user.role = new Role()
    user.role.id = 1
    randomNumber = Math.random()
    user.payment = randomNumber < 0.5 ? "debit" : "credit"
    user.save()

    const fakeUsers = Array.from({ length: num_users - 2 }, generateFakeUsers)
    await User.save(fakeUsers)

    console.log("---------------------------")
    console.log("---Users saved correctly---")
    console.log("---------------------------")
  } catch (error) {
    console.log(error)
  } finally {
    if (AppDataSource) {
      await AppDataSource.destroy()
    }
  }
}
// Generate Fake Drivers

const generateFakeDrivers = () => {
  const driver = new Driver()
  fakeName = faker.person.firstName() + " " + faker.person.lastName()
  driver.driverName = fakeName
  let arrayName = fakeName.split(/(?=[A-Z])/)
  driver.email = arrayName[0].trim() + arrayName[1] + "@gmail.com"
  driver.phone = faker.phone.number()
  driver.password = bcrypt.hashSync(`123456`, 8)
  driver.role = new Role()
  driver.carId = Math.floor(Math.random() * num_cars + 1)
  driver.role.id = 1
  driver.score = Math.floor(Math.random() * 5 + 1)
  return driver
}
const driverSeedDatabase = async () => {
  try {
    await AppDataSource.initialize()

    // Hardcoded superadmin
    const superadmin = new Driver()
    superadmin.driverName = "Super"
    superadmin.email = "super@super.com"
    superadmin.password =
      "$2b$08$Rj.Etm9wcVccDkV6jM8kM.fUFNgDDHO0fHCNWcKuGWcA4lZpXPsMO" // 123456
    superadmin.role = new Role()
    superadmin.carId = Math.floor(Math.random() * num_cars + 1)
    superadmin.score = Math.floor(Math.random() * 5 + 1)

    superadmin.role.id = 3
    superadmin.save()

    // Fake drivers (with role_id = 1 by default)
    const fakeDrivers = Array.from({ length: num_drivers }, generateFakeDrivers)
    await Driver.save(fakeDrivers)

    console.log("-----------------------------")
    console.log("---Drivers saved correctly---")
    console.log("-----------------------------")
  } catch (error) {
    console.log(error)
  } finally {
    if (AppDataSource) {
      await AppDataSource.destroy()
    }
  }
}

const generateFakeBrands = () => {
  const brand = new Brand()
  brand.name = faker.vehicle.manufacturer()
  return brand
}
const brandSeedDatabase = async () => {
  try {
    await AppDataSource.initialize()

    const fakeBrand = Array.from({ length: num_cars }, generateFakeBrands)
    await Brand.save(fakeBrand)

    console.log("--------------------------------")
    console.log("----Brands saved correctly------")
    console.log("--------------------------------")
  } catch (error) {
    console.log(error)
  } finally {
    if (AppDataSource) {
      await AppDataSource.destroy()
    }
  }
}

const generateFakeCars = () => {
  const car = new Car()
  faker.vehicle.vehicle()
  car.model = faker.vehicle.vehicle()
  car.powerEngine = faker.vehicle.fuel()

  const randomNumber = Math.random()
  car.seats = randomNumber < 0.5 ? 4 : 6
  car.accessibleCar = car.seats === 6 ? true : false
  car.numberPlate = faker.vehicle.vrm()
  car.brandId = Math.floor(Math.random() * num_cars + 1)

  return car
}
const carSeedDatabase = async () => {
  try {
    await AppDataSource.initialize()

    const fakeCars = Array.from({ length: num_cars }, generateFakeCars)
    await Car.save(fakeCars)

    console.log("-----------------------------")
    console.log("----Cars saved correctly-----")
    console.log("-----------------------------")
  } catch (error) {
    console.log(error)
  } finally {
    if (AppDataSource) {
      await AppDataSource.destroy()
    }
  }
}

const startSeeders = async () => {
  await roleSeedDatabase()
  await userSeedDatabase()
  await brandSeedDatabase()
  await carSeedDatabase()
  await driverSeedDatabase()
}

startSeeders()
