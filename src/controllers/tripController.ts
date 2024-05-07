import { Request, Response } from "express"
import { Trip } from "../database/models/Trip"
import { User } from "../database/models/User"

export const createTripWithToken = async (req: Request, res: Response) => {
  try {
    const userId = req.tokenData.userId
    const {
      driverId,

      tripStartDate,
      destination,
    } = req.body

    const newtrip = await Trip.create({
      tripStartDate: tripStartDate,
      userId: userId,
      destination: destination,
      driverId: driverId,
    }).save()
    res.status(201).json({
      success: true,
      message: "Trip created successfuly",
      data: newtrip,
    })
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "Can't create trip,",
      error: error,
    })
  }
}
export const showMyTripsWithToken = async (req: Request, res: Response) => {
  try {
    const userId = req.tokenData.userId
    const user = await User.find({
      where: {
        id: userId,
      },
      select: {
        trips: true,
        id: true,
        userName: true,
        location: true,
      },
    })
    const trip = await Trip.find({
      order: {
        tripDate: "ASC",
      },
      where: {
        userId: userId,
      },
      relations: {
        driver: true,
      },
      select: {
        tripDate: true,
        id: true,
        driver: {
          driverName: true,
          carId: true,
          id: true,
        },
      },
    })
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip/s not found",
        error: Error,
      })
    }
    res.status(200).json({
      success: true,
      message: "Trip retrieved successfuly",
      user,
      trip,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Trip can't be retriever successfully",
      error: error,
    })
  }
}

// export const recoverAppointmentWithId = async (req: Request, res: Response) => {
//   try {
//     const appointment_id = req.params.id

//     const { userId } = req.tokenData

//     const appointment = await Appointment.find({
//       where: {
//         userId: userId,
//         id: parseInt(appointment_id),
//       },
//       relations: {
//         service: true,
//       },
//       select: {
//         appointmentDate: true,
//         id: true,
//         service: {
//           serviceName: true,
//           description: true,
//         },
//       },
//     })
//     if (!appointment.length) {
//       return res.status(404).json({
//         success: false,
//         message: "Appointment id not found",
//       })
//     }
//     res.status(200).json({
//       success: true,
//       message: "Appointment id retrieved successfuly",
//       data: appointment,
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Appointment id can't be retriever successfully",
//       error: error,
//     })
//   }
// }

// export const getAllAppointmentsSuper_admin = async (
//   req: Request,
//   res: Response
// ) => {
//   const appointment = await Appointment.find({
//     order: {
//       appointmentDate: "ASC",
//     },
//     relations: {
//       service: true,
//     },
//     select: {
//       appointmentDate: true,

//       service: {
//         serviceName: true,
//         description: true,
//       },
//     },
//   })
//   if (!appointment) {
//     return res.status(404).json({
//       success: false,
//       message: "Appointment not found",
//     })
//   }
//   res.status(200).json({
//     success: true,
//     message: "Appointment showing successfuly",
//     data: appointment,
//   })
// }

export const deleteTripById = async (req: Request, res: Response) => {
  //no borra la funcion, revisar
  try {
    const userId = req.tokenData.userId
    console.log(userId)
    console.log(parseInt(req.params.id))

    const tripToRemove: any = await Trip.findOneBy({
      userId: userId,
      id: parseInt(req.params.id),
    })
    if (!tripToRemove) {
      return res.status(404).json({
        success: false,
        message: "trip can't be deleted because not exist in Data Base",
      })
    }
    console.log(tripToRemove, "fdsagfadgdfa")

    const tripDeleted = await Trip.delete(tripToRemove)
    console.log(tripDeleted, "el borrado")
    // if (!tripDeleted.affected) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "trip can't be deleted",
    //   })
    // }
    return res.status(200).json({
      success: true,
      message: "Trip deleted",
      tripDeleted: tripToRemove,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Trip can't be deleted",
      error: error,
    })
  }
}
// export const updateMyAppointmentWithToken = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const { appointmentDate, appointment_id } = req.body
//     const userId = req.tokenData.userId
//     const appointment = await Appointment.find({
//       where: {
//         userId: userId,
//         id: parseInt(appointment_id), // busca la cita a actualizar le paso id q quiero actualizar
//       },
//       relations: {
//         service: true,
//       },
//       select: {
//         appointmentDate: true,
//         id: true,
//         service: {
//           serviceName: true,
//           description: true,
//           id: true,
//         },
//       },
//     })
//     console.log(appointment)
//     if (!appointment.length) {
//       return res.status(404).json({
//         success: false,
//         message: "Appointment/s not found",
//         error: Error,
//       })
//     }
//     const appointmentToUpdate = await Appointment.update(
//       {
//         userId: userId,
//         id: appointment_id,
//       },
//       {
//         appointmentDate: appointmentDate,
//       }
//     )
//     if (!appointmentToUpdate.affected) {
//       return res.status(404).json({
//         success: false,
//         message: "Appointment/s not found",
//         error: Error,
//       })
//     }
//     res.status(200).json({
//       success: true,
//       message: "Appointment updated successfuly",
//       appointment,
//       newDateAppointemnt: appointmentDate,
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Appointment can't be updated",
//       error: error,
//     })
//   }
// }
