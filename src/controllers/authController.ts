import { Request, Response } from "express"
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"
import { User } from "../database/models/User"

export const registerUser = async (req: Request, res: Response) => {
  try {
    const reqUserName: string = req.body.userName
    const reqMail: string = req.body.email
    const reqPass: string = req.body.password

    //Checking if exist e-mail (user) in the database
    const userDataBase = await User.findOne({
      where: {
        email: reqMail,
      },
    })
    if (userDataBase) {
      return res.status(400).json({
        success: false,
        message: "This user email is already exist in owner Data Base",
      })
    }

    if (reqPass.length < 6 || reqPass.length > 10) {
      return res.status(400).json({
        success: false,
        message: "the password has to be between 6 and 10 characters",
      })
    }
    const validEmail: RegExp = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/
    if (!validEmail.test(reqMail)) {
      return res.status(400).json({
        success: false,
        message: "Email inserted not valid - Structure wrong",
      })
    }
    const cryptedPass = bcrypt.hashSync(reqPass, 8)

    const newUser = await User.create({
      userName: reqUserName,
      email: reqMail,
      password: cryptedPass,
      role: {
        id: 1,
      },
    }).save()
    const { password, ...newUserRegistered } = newUser
    return res.status(201).json({
      success: true,
      message: "User registered into Data Base successfully",
      data: newUserRegistered,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Register user failure",
      error: error,
    })
  }
}
export const loginUser = async (req: Request, res: Response) => {
  try {
    // const { email, password } = req.body
    const email = req.body.email
    const pass = req.body.password
    if (!email || !pass) {
      return res.status(400).json({
        success: false,
        message: "Email and password are needed",
      })
    }
    const user = await User.findOne({
      where: {
        email: email,
      },
      relations: {
        role: true,
      },
    })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email o password invalid",
      })
    }
    const isValidPassword = bcrypt.compareSync(pass, user.password)
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Email o password invalid",
      })
    }
    const token = Jwt.sign(
      {
        userName: user.userName,
        email: user.email,
        userId: user.id,
        roleName: user.role.title,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "2h",
      }
    )
    const { password, roleId, ...userLogged } = user
    return res.status(200).json({
      success: true,
      message: "User logged successfully",
      token: token,
      data: userLogged,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User can't be logged",
      error: error,
    })
  }
}
