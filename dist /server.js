"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = require("./app");
const db_1 = require("./database/db");
const PORT = process.env.PORT || 5500;
const startServer = () => {
    db_1.AppDataSource.initialize()
        .then(() => {
        console.log("database connected");
        app_1.app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
        .catch((error) => {
        console.log("error");
    });
};
startServer();
