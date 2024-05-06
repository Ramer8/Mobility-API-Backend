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
    const userId = req.tokenData.userId
    const driverUpdated = await Driver.update(
      {
        id: userId,
      },
      {
        driverName: req.body.userName,
        phone: req.body.phone,
        // payment: req.body.payment,
        // address: req.body.address,
      }
    )
    console.log(driverUpdated)
    res.status(200).json({
      success: true,
      message: "Driver updated ",
      driverNameUpdated: req.body.driverName,
      phoneUpdated: req.body.phone,
      //   paymentUpdated: req.body.payment,
      //   addressUpdated: req.body.address,
    })
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Driver can't be updated",
      error: error,
    })
  }
}
