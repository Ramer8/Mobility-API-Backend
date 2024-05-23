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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMoreThanOneUsers = exports.deleteUserById = exports.updateUserProfile = exports.getUserProfile = exports.searchUserbyEmailOrName = exports.getUsers = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../database/models/User");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1; // Default to page 1 if not specified
        const limit = req.query.limit ? parseInt(req.query.limit) : 10; // Default to 10 items per page if not specified
        const skip = (page - 1) * limit;
        const users = yield User_1.User.find({
            order: {
                userName: "ASC",
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
                roleId: true,
                createdAt: true,
            },
            skip,
            take: limit,
        });
        res.status(200).json({
            success: true,
            message: "user retriever successfully",
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "user can't be retriever successfully",
            error: error,
        });
    }
});
exports.getUsers = getUsers;
const searchUserbyEmailOrName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1; // Default to page 1 if not specified
        const limit = req.query.limit ? parseInt(req.query.limit) : 10; // Default to 10 items per page if not specified
        const skip = (page - 1) * limit;
        // Check if the request contains a search query parameter for email or name
        const searchQuery = req.query.search;
        // Define the filter criteria
        const filterCriteria = {
            order: {
                userName: "ASC",
            },
            select: [
                "id",
                "userName",
                "email",
                "phone",
                "payment",
                "address",
                "workAddress",
                "savedAddress",
                "documents",
                "roleId",
                "createdAt",
            ],
            skip,
            take: limit,
        };
        if (searchQuery) {
            // If a search query is provided, filter users by email or name
            filterCriteria.where = [
                { email: (0, typeorm_1.Like)(`%${searchQuery}%`) },
                { userName: (0, typeorm_1.Like)(`%${searchQuery}%`) },
            ];
        }
        // Find users based on the filter criteria
        const users = yield User_1.User.find(filterCriteria);
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Users couldn't be retrieved successfully",
            error: error,
        });
    }
});
exports.searchUserbyEmailOrName = searchUserbyEmailOrName;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.tokenData;
        const user = yield User_1.User.findOne({
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
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "user can't be retriever successfully",
            error: error,
        });
    }
});
exports.getUserProfile = getUserProfile;
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.userId;
        const userUpdated = yield User_1.User.update({
            id: userId,
        }, {
            userName: req.body.userName,
            phone: req.body.phone,
            payment: req.body.payment,
            address: req.body.address,
        });
        console.log(userUpdated);
        res.status(200).json({
            success: true,
            message: "User updated ",
            userNameUpdated: req.body.userName,
            phoneUpdated: req.body.phone,
            paymentUpdated: req.body.payment,
            addressUpdated: req.body.address,
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: "User can't be updated",
            error: error,
        });
    }
});
exports.updateUserProfile = updateUserProfile;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const userToRemove = yield User_1.User.findOne({
            where: { id: parseInt(userId) },
            select: ["id", "userName", "email", "createdAt", "roleId"],
        });
        if (!userToRemove) {
            return res.status(404).json({
                success: false,
                message: "User can't be deleted because not exist in Data Base",
            });
        }
        if (userToRemove.roleId === 3 || userToRemove.roleId === 2) {
            return res.status(500).json({
                success: false,
                message: "This user can't be deleted",
            });
        }
        const userDeleted = yield User_1.User.delete(userToRemove);
        if (!userDeleted.affected) {
            return res.status(404).json({
                success: false,
                message: "User can't be deleted",
            });
        }
        res.status(200).json({
            success: true,
            message: "user deleted successfully",
            data: { userDeleted, userToRemove },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User can't be deleted",
            error: error,
        });
    }
});
exports.deleteUserById = deleteUserById;
const deleteMoreThanOneUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersId = req.body.usersId;
        const usersToRemove = yield User_1.User.createQueryBuilder("user")
            .select([
            "user.id",
            "user.userName",
            "user.email",
            "user.createdAt",
            "user.roleId",
        ])
            .where("user.id IN (:...usersId)", { usersId })
            .getMany();
        const isSuperAdmin = usersToRemove.find((users) => users.roleId === 3 || users.roleId === 2);
        if (isSuperAdmin) {
            return res.status(500).json({
                success: false,
                message: "One of this users can't be deleted",
            });
        }
        if (!usersToRemove.length) {
            return res.status(404).json({
                success: false,
                message: "User/s can't be deleted because not exist in Data Base",
            });
        }
        const userDeleted = yield User_1.User.delete(usersToRemove);
        res.status(200).json({
            success: true,
            message: "user/s deleted successfully",
            data: userDeleted,
            usersToRemove,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User/s can't be deleted",
            error: error,
        });
    }
});
exports.deleteMoreThanOneUsers = deleteMoreThanOneUsers;
