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
