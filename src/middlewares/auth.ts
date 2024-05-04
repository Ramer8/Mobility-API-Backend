import { NextFunction, Request, Response } from "express"
import Jwt from "jsonwebtoken"
import { TokenData } from "../types"
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]
  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "UNAUTHORIZED",
      })
    }
    const decoded = Jwt.verify(token, process.env.JWT_SECRET as string)

    req.tokenData = decoded as TokenData
    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "JWT NOT VALID OR TOKEN MALFORMED",
      error: error,
    })
  }
}
