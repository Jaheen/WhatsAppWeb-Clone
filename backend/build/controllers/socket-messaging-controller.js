"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var Conversation_1 = require("../models/Conversation");
var Message_1 = require("../models/Message");
var User_1 = require("../models/User");
var SocketMessagingController = (function () {
    function SocketMessagingController() {
    }
    SocketMessagingController.onOutgoingMessageArrived = function (io, socket, message) {
        Message_1["default"].create({
            senderID: socket["userID"],
            recieverID: message.recieverID,
            contentType: message.contentType,
            content: message.content,
            timestamp: message.timestamp
        }).then(function (newMessage) {
            if (newMessage) {
                Conversation_1["default"].findOrCreate({ where: { user1ID: message.recieverID, user2ID: socket["userID"] } })
                    .then(function (_a) {
                    var _b;
                    var conversation = _a[0], isCreated = _a[1];
                    if (isCreated) {
                        User_1["default"].findOne({
                            where: { userID: conversation.get("user2ID") },
                            attributes: ["userID", "username", "phoneNumber", "profilePicURL", "description", "lastActive"]
                        }).then(function (user) {
                            var _a;
                            if (user) {
                                var incomingMessage_1 = __assign(__assign({}, message), { newConversation: user.get() });
                                Conversation_1["default"].update({ lastMessageID: newMessage.get("messageID") }, {
                                    where: (_a = {},
                                        _a[sequelize_1.Op.or] = [
                                            { user1ID: socket["userID"], user2ID: message.recieverID },
                                            { user1ID: message.recieverID, user2ID: socket["userID"] }
                                        ],
                                        _a)
                                }).then(function () {
                                    io.to(message.recieverID).emit("incoming-message", incomingMessage_1);
                                    message.messageID = newMessage.get("messageID");
                                    socket.emit("message-sent", message);
                                })["catch"](console.log);
                            }
                        })["catch"](console.log);
                    }
                    else {
                        var incomingMessage_2 = message;
                        Conversation_1["default"].update({ lastMessageID: newMessage.get("messageID") }, {
                            where: (_b = {},
                                _b[sequelize_1.Op.or] = [
                                    { user1ID: socket["userID"], user2ID: message.recieverID },
                                    { user1ID: message.recieverID, user2ID: socket["userID"] }
                                ],
                                _b)
                        }).then(function () {
                            io.to(message.recieverID).emit("incoming-message", incomingMessage_2);
                            message.messageID = newMessage.get("messageID");
                            socket.emit("message-sent", message);
                        })["catch"](console.log);
                    }
                    conversation.set("unreadMessages", conversation.get("unreadMessages") + 1);
                    conversation.save();
                })["catch"](console.log);
            }
        })["catch"](console.log);
    };
    SocketMessagingController.onDeleteMessage = function (io, socket, messageID) {
        Message_1["default"].findOne({
            where: { messageID: messageID },
            attributes: ["messageID", "senderID", "recieverID", "contentType", "content", "timestamp"]
        }).then(function (message) {
            if (message.get("senderID") === socket["userID"]) {
                message.set("contentType", "TEXT");
                message.set("content", "This message was deleted");
                message.save().then(function (updatedMessage) {
                    io.to([message.get("senderID"), message.get("recieverID")]).emit("message-deleted", updatedMessage.toJSON());
                })["catch"](console.log);
            }
        })["catch"](console.log);
    };
    return SocketMessagingController;
}());
exports["default"] = SocketMessagingController;
