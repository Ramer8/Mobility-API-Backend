import { AppDataSource } from "../db"
import { faker } from "@faker-js/faker"
import bcrypt from "bcrypt"
import { Role } from "../models/Role"
import { User } from "../models/User"

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
let fakeName
// create false users to populate DB (with Faker)
const generateFakeUsers = () => {
  const user = new User()
  fakeName = faker.person.firstName() + faker.person.lastName()
  user.userName = fakeName
  user.email = fakeName + "@gmail.com"
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
    superadmin.save()

    // Hardcoded admin
    const admin = new User()
    admin.userName = "Admin"
    admin.email = "admin@admin.com"
    admin.password =
      "$2b$08$Rj.Etm9wcVccDkV6jM8kM.fUFNgDDHO0fHCNWcKuGWcA4lZpXPsMO" // 123456
    admin.role = new Role()
    admin.role.id = 2
    admin.save()

    // Fake users (with role_id = 1 by default)
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

// Create services (5 hardcoded examples)
// const serviceSeedDatabase = async () => {
//   try {
//     await AppDataSource.initialize()

//     const service1 = new Service()
//     service1.serviceName = "Custom tatoo"
//     service1.description =
//       "Customers will have the freedom to select unique motifs and designs, fully customizingtheir tattoo experience according to their preferences and tastes."
//     service1.id = 1
//     service1.image =
//       "https://i.pinimg.com/564x/7a/fe/4c/7afe4cd740c53d4065d4886ccb0902bd.jpg"
//     await service1.save()

//     const service2 = new Service()
//     service2.serviceName = "Web catalog tatoo"
//     service2.description =
//       "We offer the realization of tattoos based on predefined designs in our catalog.catalog. Customers can choose from a variety of stylish and proven options."
//     service2.id = 2
//     service2.image =
//       "https://i.pinimg.com/736x/b5/38/d1/b538d12d54bfe40a95311bde1d501c4c.jpg"
//     await service2.save()

//     const service3 = new Service()
//     service3.serviceName = "Old tattoo restoration"
//     service3.description =
//       "We specialize in the restoration and rejuvenation of existing tattoos. Ourexperts work to enhance and renew old tattoos, giving them back their vitality."
//     service3.id = 3
//     service3.image =
//       "https://i.pinimg.com/564x/33/69/74/33697454106bd7cbdf350f5491d89374.jpg"
//     await service3.save()

//     const service4 = new Service()
//     service4.serviceName = "Piercing and dilator insertion"
//     service4.description =
//       "We offer professional services for the placement of piercings and dilators. OurOur team guarantees safe procedures and varied styles to meet the individual preferences of our clients.preferences of our client"
//     service4.id = 4
//     service4.image =
//       "https://i.pinimg.com/564x/01/63/67/0163671140d9c5d067bd5276469ac238.jpg"
//     await service4.save()

//     const service5 = new Service()
//     service5.serviceName = "Sale of piercings and other articles"
//     service5.description =
//       "In addition to our services, we offer a selection of piercings and other body art related items. Customers can purchase quality products to complement their unique style."
//     service5.id = 5
//     service5.image =
//       "https://i.pinimg.com/564x/75/9d/96/759d96ab9ada0604952a77e6bc681c13.jpg"

//     await service5.save()
//     console.log("----------------------------")
//     console.log("--Services saved correctly--")
//     console.log("----------------------------")
//   } catch (error) {
//     console.log(error)
//   } finally {
//     if (AppDataSource) {
//       await AppDataSource.destroy()
//     }
//   }
// }

// Variables (double check number of users and services)
// Number of fake users and appointments we want to populate DB with
// Roles and services are hardcoded
// Hardcoded seed - in case of adding more services, this need to be changed by hand to adjust "generateFakeAppointments" in seeder)
let num_services = 5
let num_appointments = 100
// Create appointments (choosing random number in the range of the users and services variables declared above)
// const generateFakeAppointments = () => {
//   const appointment = new Appointment()
//   appointment.appointmentDate = faker.date.future()

//   let randomUser = Math.floor(Math.random() * num_users + 1)
//   appointment.userId = randomUser

//   let randomService = Math.floor(Math.random() * num_services + 1)
//   appointment.serviceId = randomService

//   return appointment
// }

// const appointmentSeedDatabase = async () => {
//   try {
//     await AppDataSource.initialize()

//     const fakeAppointments = Array.from(
//       { length: num_appointments },
//       generateFakeAppointments
//     )
//     await Appointment.save(fakeAppointments)
//     console.log("------------------------------")
//     console.log("-Appointments saved correctly-")
//     console.log("------------------------------")
//   } catch (error) {
//     console.log(error)
//   } finally {
//     if (AppDataSource) {
//       await AppDataSource.destroy()
//     }
//   }
// }

const startSeeders = async () => {
  await roleSeedDatabase()
  await userSeedDatabase()
  //   await serviceSeedDatabase()
  //   await appointmentSeedDatabase()
}

startSeeders()
