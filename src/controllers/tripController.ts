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

export const getAllTripsSuper_admin = async (req: Request, res: Response) => {
  const trip = await Trip.find({
    order: {
      tripDate: "ASC",
    },
    relations: {
      driver: true,
      car: true,
      user: true,
    },
    select: {
      tripDate: true,
      // the relation with cars table dont fetch the value , solve this
      car: {
        model: true,
        seats: true,
        powerEngine: true,
        numberPlate: true,
        accessibleCar: true,
      },
      driver: {
        driverName: true,
        carId: true,
      },
      user: {
        userName: true,
        payment: true,
      },
    },
  })
  if (!trip) {
    return res.status(404).json({
      success: false,
      message: "trip not found",
    })
  }
  return res.status(200).json({
    success: true,
    message: "trip showing successfuly",
    data: trip,
  })
}

export const deleteTripById = async (req: Request, res: Response) => {
  try {
    const userId = req.tokenData.userId

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

    const tripDeleted = await Trip.remove(tripToRemove)

    return res.status(200).json({
      success: true,
      message: "Trip deleted",
      tripDeleted: tripDeleted,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Trip can't be deleted",
      error: error,
    })
  }
}
export const updateMyTripWithToken = async (req: Request, res: Response) => {
  try {
    const {
      tripDate,
      trip_id,
      startLocation,
      destination,
      driverId,
      tripStartDate,
      tripFinishDate,
      carId,
    } = req.body
    const userId = req.tokenData.userId
    const trip = await Trip.find({
      where: {
        userId: userId,
        id: parseInt(trip_id), // busca la cita a actualizar le paso id q quiero actualizar
      },
      relations: {
        driver: true,
        user: true,
        // car: true,
      },
      select: {
        tripDate: true,
        id: true,
        driver: {
          driverName: true,
          carId: true,
          id: true,
        },
        user: {
          userName: true,
          payment: true,
        },
        // car: {
        //   model: true,
        //   numberPlate: true,
        // },
      },
    })
    console.log(trip)
    if (!trip.length) {
      return res.status(404).json({
        success: false,
        message: "trip/s not found",
        error: Error,
      })
    }
    const tripToUpdate = await Trip.update(
      {
        userId: userId,
        id: trip_id,
      },
      {
        tripDate: tripDate,
        startLocation: startLocation,
        destination: destination,
        driverId: driverId,
        tripStartDate: tripStartDate,
        tripFinishDate: tripFinishDate,
        carId: carId,
      }
    )
    if (!tripToUpdate.affected) {
      return res.status(404).json({
        success: false,
        message: "trip/s not found",
        error: Error,
      })
    }
    console.log(tripToUpdate, "lo que cambio")
    res.status(200).json({
      success: true,
      message: "trip updated successfuly",
      trip,
      tripDate: tripDate,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "trip can't be updated",
      error: error,
    })
  }
}
