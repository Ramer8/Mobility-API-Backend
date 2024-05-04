import { Request, Response } from "express"
import { User } from "../database/models/User"

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.tokenData
    const user = await User.findOne({
      where: {
        id: userId,
      },
      select: {
        id: true,
        userName: true,
        email: true,
        phone: true,
        payment: true,
        address: true,
        workAddress: true,
        savedAddress: true,
        documents: true,
        createdAt: true,
        roleId: true,
        location: true,
      },
    })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      })
    }
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user can't be retriever successfully",
      error: error,
    })
  }
}
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.tokenData.userId
    const userUpdated = await User.update(
      {
        id: userId,
      },
      {
        userName: req.body.userName,
        phone: req.body.phone,
        payment: req.body.payment,
        address: req.body.address,
      }
    )
    console.log(userUpdated)
    res.status(200).json({
      success: true,
      message: "User updated ",
      userNameUpdated: req.body.userName,
      phoneUpdated: req.body.phone,
      paymentUpdated: req.body.payment,
      addressUpdated: req.body.address,
    })
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "User can't be updated",
      error: error,
    })
  }
}
