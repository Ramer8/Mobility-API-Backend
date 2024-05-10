import { Request, Response } from "express"
import { Trip } from "../database/models/Trip"
import { User } from "../database/models/User"
import { Driver } from "../database/models/Driver"

export const createTripWithToken = async (req: Request, res: Response) => {
  try {
    const userId = req.tokenData.userId
    const { driverId, tripStartDate, destination, startLocation } = req.body
    const dataDriver = await Driver.find({
      where: {
        id: driverId,
      },
      select: {
        carId: true,
      },
    })

    const newtrip = await Trip.create({
      userId: userId,
      startLocation: startLocation,
      tripStartDate: tripStartDate,
      destination: destination,
      driverId: driverId,
      carId: dataDriver[0].carId,
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

export const recoverTripWithId = async (req: Request, res: Response) => {
  try {
    const tripId = req.params.id

    const { userId } = req.tokenData

    const trip = await Trip.find({
      where: {
        userId: userId,
        id: parseInt(tripId),
      },
      relations: {
        driver: true,
        car: true,
        user: true,
      },
      select: {
        tripDate: true,
        startLocation: true,
        destination: true,
        tripFinishDate: true,
        tripStartDate: true,
        car: {
          model: true,
          seats: true,
          powerEngine: true,
          numberPlate: true,
          accessibleCar: true,
          brandId: true,
        },
        driver: {
          driverName: true,
          carId: true,
          score: true,
          driverMessage: true,
        },
        user: {
          userName: true,
          payment: true,
        },
      },
    })

    if (!trip.length) {
      return res.status(404).json({
        success: false,
        message: "Trip id not found",
      })
    }
    res.status(200).json({
      success: true,
      message: "Trip id retrieved successfuly",
      data: trip,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Trip id can't be retriever successfully",
      error: error,
    })
  }
}

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
