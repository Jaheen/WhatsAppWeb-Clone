"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var connection_1 = require("./connection");
var Message_1 = require("./Message");
var User_1 = require("./User");
var Conversation = connection_1["default"].define("Conversation", {
    user1ID: {
        type: sequelize_1.UUID,
        references: {
            model: User_1["default"],
            key: "userID"
        }
    },
    unreadMessages: {
        type: sequelize_1.INTEGER,
        defaultValue: 0
    }
});
Conversation.belongsTo(User_1["default"], {
    as: "user2",
    foreignKey: {
        name: "user2ID",
        allowNull: false
    }
});
Conversation.belongsTo(Message_1["default"], {
    as: "lastMessage",
    foreignKey: {
        name: "lastMessageID"
    }
});
exports["default"] = Conversation;
