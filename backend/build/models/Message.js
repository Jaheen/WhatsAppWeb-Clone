"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var connection_1 = require("./connection");
var User_1 = require("./User");
var Message = connection_1["default"].define("Message", {
    messageID: {
        type: sequelize_1.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.UUIDV4
    },
    contentType: {
        type: sequelize_1.STRING,
        values: ["TEXT", "LINK", "IMAGE", "VIDEO", "AUDIO"],
        defaultValue: "TEXT"
    },
    content: {
        type: sequelize_1.TEXT
    },
    timestamp: {
        type: sequelize_1.STRING,
        defaultValue: function () { return Date.now().toString(); }
    }
});
Message.belongsTo(User_1["default"], {
    foreignKey: {
        name: "senderID",
        allowNull: false
    }
});
Message.belongsTo(User_1["default"], {
    foreignKey: {
        name: "recieverID",
        allowNull: false
    }
});
exports["default"] = Message;
