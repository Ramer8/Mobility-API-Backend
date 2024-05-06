import { Request, Response } from "express"
import { Driver } from "../database/models/Driver"

export const getDriverProfile = async (req: Request, res: Response) => {
  try {
    const { driverId } = req.tokenData
    const driver = await Driver.findOne({
      where: {
        id: driverId,
      },
      select: {
        id: true,
        driverName: true,
        email: true,
        roleId: true,
        phone: true,
        documents: true,
        score: true,
        driverMessage: true,
        location: true,
        createdAt: true,
      },
    })
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      })
    }
    res.status(200).json({
      success: true,
      message: "Driver retrieved successfully",
      data: driver,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Driver can't be retriever successfully",
      error: error,
    })
  }
}
export const updateDriverProfile = async (req: Request, res: Response) => {
  try {
    const driverId = req.tokenData.driverId
    const driverUpdated = await Driver.update(
      {
        id: driverId,
      },
      {
        driverName: req.body.driverName,
        phone: req.body.phone,
        documents: req.body.documents,
        location: req.body.location,
        driverMessage: req.body.driverMessage,
        score: req.body.score,
      }
    )
    if (!driverUpdated.affected) {
      return res.status(404).json({
        success: false,
        message: "Driver profile can't updated",
      })
    }
    res.status(200).json({
      success: true,
      message: "Driver updated successfully",
      driverNameUpdated: req.body.driverName,
      phoneUpdated: req.body.phone,
      scoreUpdated: req.body.score,
      driverMessageUpdated: req.body.driverMessage,
      driver: driverUpdated,
    })
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Driver can't be updated",
      error: error,
    })
  }
}

export const getDrivers = async (req: Request, res: Response) => {
  try {
    const drivers = await Driver.find({
      order: {
        driverName: "ASC",
      },
    })

    res.status(200).json({
      success: true,
      message: "user retriever successfully",
      data: drivers,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user can't be retriever successfully",
      error: error,
    })
  }
}

export const deleteDriverById = async (req: Request, res: Response) => {
  try {
    const driverId = req.params.id

    const driverToRemove: any = await Driver.findOne({
      where: { id: parseInt(driverId) },
      select: ["id", "driverName", "email", "createdAt", "roleId"],
    })

    if (!driverToRemove) {
      return res.status(404).json({
        success: false,
        message: "Driver can't be deleted because not exist in Data Base",
      })
    }

    if (driverToRemove.roleId === 3) {
      return res.status(403).json({
        success: false,
        message: "This driver can't be deleted",
      })
    }

    const driverDeleted = await Driver.delete(driverToRemove)

    if (!driverDeleted.affected) {
      return res.status(404).json({
        success: false,
        message: "Driver can't be deleted",
      })
    }

    res.status(200).json({
      success: true,
      message: "Driver deleted successfully",
      data: { driverDeleted, driverToRemove },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Driver can't be deleted",
      error: error,
    })
  }
}
export const deleteMoreThanOneDrivers = async (req: Request, res: Response) => {
  try {
    const driversId = req.body.driversId
    const driversToRemove: any[] = await Driver.createQueryBuilder("driver")
      .select([
        "driver.id",
        "driver.driverName",
        "driver.email",
        "driver.createdAt",
        "driver.roleId",
      ])
      .where("driver.id IN (:...driversId)", { driversId })
      .getMany()
    const isSuperAdmin = driversToRemove.find((drivers) => drivers.roleId === 3)
    if (isSuperAdmin) {
      return res.status(500).json({
        success: false,
        message: "One of this drivers can't be deleted",
      })
    }
    if (!driversToRemove.length) {
      return res.status(404).json({
        success: false,
        message: "Driver/s can't be deleted because not exist in Data Base",
      })
    }

    const driverDeleted = await Driver.delete(driversToRemove)

    res.status(200).json({
      success: true,
      message: "Driver/s deleted successfully",
      data: driverDeleted,
      driversToRemove,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Driver/s can't be deleted",
      error: error,
    })
  }
}
