"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var connection = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: process.env.SQLITE_DATABASE_LOCATION
});
exports["default"] = connection;
