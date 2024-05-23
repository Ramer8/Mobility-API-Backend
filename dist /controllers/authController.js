"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginDriver = exports.registerDriver = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../database/models/User");
const Driver_1 = require("../database/models/Driver");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqUserName = req.body.userName;
        const reqMail = req.body.email;
        const reqPass = req.body.password;
        //Checking if exist e-mail (user) in the database
        const userDataBase = yield User_1.User.findOne({
            where: {
                email: reqMail,
            },
        });
        if (userDataBase) {
            return res.status(400).json({
                success: false,
                message: "This user email is already exist in owner Data Base",
            });
        }
        if (reqPass.length < 6 || reqPass.length > 10) {
            return res.status(400).json({
                success: false,
                message: "the password has to be between 6 and 10 characters",
            });
        }
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/;
        if (!validEmail.test(reqMail)) {
            return res.status(400).json({
                success: false,
                message: "Email inserted not valid - Structure wrong",
            });
        }
        const cryptedPass = bcrypt_1.default.hashSync(reqPass, 8);
        const newUser = yield User_1.User.create({
            userName: reqUserName,
            email: reqMail,
            password: cryptedPass,
            role: {
                id: 1,
            },
        }).save();
        const { password } = newUser, newUserRegistered = __rest(newUser, ["password"]);
        return res.status(201).json({
            success: true,
            message: "User registered into Data Base successfully",
            data: newUserRegistered,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Register user failure",
            error: error,
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { email, password } = req.body
        const email = req.body.email;
        const pass = req.body.password;
        if (!email || !pass) {
            return res.status(400).json({
                success: false,
                message: "Email and password are needed",
            });
        }
        const user = yield User_1.User.findOne({
            where: {
                email: email,
            },
            relations: {
                role: true,
            },
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email o password invalid",
            });
        }
        const isValidPassword = bcrypt_1.default.compareSync(pass, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Email o password invalid",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            userName: user.userName,
            email: user.email,
            userId: user.id,
            roleName: user.role.title,
            payment: user.payment,
        }, process.env.JWT_SECRET, {
            expiresIn: "20h",
        });
        const { password, roleId } = user, userLogged = __rest(user, ["password", "roleId"]);
        return res.status(200).json({
            success: true,
            message: "User logged successfully",
            token: token,
            data: userLogged,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "User can't be logged",
            error: error,
        });
    }
});
exports.loginUser = loginUser;
const registerDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqDriverName = req.body.driverName;
        const reqMail = req.body.email;
        const reqPass = req.body.password;
        //Checking if exist e-mail (user) in the database
        const driverDataBase = yield Driver_1.Driver.findOne({
            where: {
                email: reqMail,
            },
        });
        if (driverDataBase) {
            return res.status(400).json({
                success: false,
                message: "This Driver email is already exist in owner Data Base",
            });
        }
        if (reqPass.length < 6 || reqPass.length > 10) {
            return res.status(400).json({
                success: false,
                message: "the password has to be between 6 and 10 characters",
            });
        }
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/;
        if (!validEmail.test(reqMail)) {
            return res.status(400).json({
                success: false,
                message: "Email inserted not valid - Structure wrong",
            });
        }
        const cryptedPass = bcrypt_1.default.hashSync(reqPass, 8);
        const newDriver = yield Driver_1.Driver.create({
            driverName: reqDriverName,
            email: reqMail,
            password: cryptedPass,
            role: {
                id: 1,
            },
        }).save();
        const { password } = newDriver, newDriverRegistered = __rest(newDriver, ["password"]);
        return res.status(201).json({
            success: true,
            message: "Driver registered into Data Base successfully",
            data: newDriverRegistered,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Register Driver failure",
            error: error,
        });
    }
});
exports.registerDriver = registerDriver;
const loginDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const pass = req.body.password;
        if (!email || !pass) {
            return res.status(400).json({
                success: false,
                message: "Email and password are needed",
            });
        }
        const driver = yield Driver_1.Driver.findOne({
            where: {
                email: email,
            },
            relations: {
                role: true,
            },
        });
        if (!driver) {
            return res.status(400).json({
                success: false,
                message: "Email o password invalid",
            });
        }
        const isValidPassword = bcrypt_1.default.compareSync(pass, driver.password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Email o password invalid",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            driverName: driver.driverName,
            email: driver.email,
            driverId: driver.id,
            roleName: driver.role.title,
        }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });
        const { password, roleId } = driver, driverLogged = __rest(driver, ["password", "roleId"]);
        return res.status(200).json({
            success: true,
            message: "Driver logged successfully",
            token: token,
            data: driverLogged,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Driver can't be logged",
            error: error,
        });
    }
});
exports.loginDriver = loginDriver;
