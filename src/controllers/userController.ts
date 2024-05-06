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
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id

    const userToRemove: any = await User.findOne({
      where: { id: parseInt(userId) },
      select: ["id", "userName", "email", "createdAt", "roleId"],
    })
    if (userToRemove.roleId === 3 || userToRemove.roleId === 2) {
      return res.status(500).json({
        success: false,
        message: "This user can't be deleted",
      })
    }
    if (!userToRemove) {
      return res.status(404).json({
        success: false,
        message: "User can't be deleted because not exist in Data Base",
      })
    }

    const userDeleted = await User.delete(userToRemove)

    res.status(200).json({
      success: true,
      message: "user deleted successfully",
      data: { userDeleted, userToRemove },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User can't be deleted",
      error: error,
    })
  }
}
// export const deleteMoreThanOneUsers = async (req: Request, res: Response) => {
//   try {
//     const usersId = req.body.usersId
//     const usersToRemove: any[] = await User.createQueryBuilder("user")
//       .select([
//         "user.id",
//         "user.firstName",
//         "user.lastName",
//         "user.email",
//         "user.createdAt",
//         "user.roleId",
//       ])
//       .where("user.id IN (:...usersId)", { usersId })
//       .getMany()

//     const isSuperAdmin = usersToRemove.find(
//       (users) => users.roleId === 3 || users.roleId === 2
//     )
//     if (isSuperAdmin) {
//       return res.status(500).json({
//         success: false,
//         message: "One of this users can't be deleted",
//       })
//     }
//     if (!usersToRemove.length) {
//       return res.status(404).json({
//         success: false,
//         message: "User/s can't be deleted because not exist in Data Base",
//       })
//     }

//     const userDeleted = await User.delete(usersToRemove)

//     res.status(200).json({
//       success: true,
//       message: "user/s deleted successfully",
//       data: userDeleted,
//       usersToRemove,
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "User/s can't be deleted",
//       error: error,
//     })
//   }
// }
