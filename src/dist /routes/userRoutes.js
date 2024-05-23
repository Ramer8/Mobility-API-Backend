"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const userController_1 = require("../controllers/userController");
const isSuperAdmin_1 = require("../middlewares/isSuperAdmin");
exports.userRouter = (0, express_1.Router)();
// Users Profile
exports.userRouter.get("/users/profile", auth_1.auth, userController_1.getUserProfile);
exports.userRouter.put("/users/profile", auth_1.auth, userController_1.updateUserProfile);
// Super Admin User Routes
exports.userRouter.delete("/users/:id", auth_1.auth, isSuperAdmin_1.isSuperAdmin, userController_1.deleteUserById);
exports.userRouter.delete("/users/", auth_1.auth, isSuperAdmin_1.isSuperAdmin, userController_1.deleteMoreThanOneUsers);
// Get all user with pagination
exports.userRouter.get("/users/", auth_1.auth, isSuperAdmin_1.isSuperAdmin, userController_1.getUsers);
exports.userRouter.get("/users/search?", auth_1.auth, isSuperAdmin_1.isSuperAdmin, userController_1.searchUserbyEmailOrName);
