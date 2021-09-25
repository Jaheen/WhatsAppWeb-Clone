"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var connection_1 = require("./connection");
var User = connection_1["default"].define("User", {
    userID: {
        type: sequelize_1.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.UUIDV4
    },
    username: {
        type: sequelize_1.STRING
    },
    phoneNumber: {
        type: sequelize_1.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: sequelize_1.TEXT,
        defaultValue: "Hi there I'm using WhatsApp Clone"
    },
    profilePicURL: {
        type: sequelize_1.TEXT,
        defaultValue: "https://firebasestorage.googleapis.com/v0/b/whatsapp-clone-1b27a.appspot.com/o/profile-pictures%2Fdefault-avatar.jpg?alt=media&token=03b17858-f970-495b-b377-f008d9fbacd1"
    },
    lastActive: {
        type: sequelize_1.STRING,
        defaultValue: function () { return Date.now().toString(); }
    }
});
exports["default"] = User;
