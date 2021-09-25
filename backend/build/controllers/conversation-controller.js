"use strict";
exports.__esModule = true;
var Conversation_1 = require("../models/Conversation");
var Message_1 = require("../models/Message");
var User_1 = require("../models/User");
var ConversationController = (function () {
    function ConversationController() {
    }
    ConversationController.getConversations = function (req, res) {
        Conversation_1["default"].findAll({
            where: { user1ID: req["userID"] },
            include: [
                { model: User_1["default"], as: "user2", attributes: ["userID", "username", "phoneNumber", "profilePicURL", "description", "lastActive"] },
                { model: Message_1["default"], as: "lastMessage", attributes: ["messageID", "senderID", "recieverID", "contentType", "content", "timestamp"] }
            ],
            attributes: ["user1ID", "user2ID", "unreadMessages"],
            order: [["updatedAt", "DESC"]]
        }).then(function (conversations) { return res.json({ conversations: conversations }); })["catch"](console.log);
    };
    ConversationController.createConversation = function (req, res) {
        if (req.body.phoneNumber) {
            User_1["default"].findOne({
                where: { phoneNumber: req.body.phoneNumber },
                attributes: ["userID", "username", "phoneNumber", "profilePicURL", "description", "lastActive"]
            }).then(function (user) {
                if (user)
                    if (user.get("userID") !== req["userID"])
                        Conversation_1["default"].findOrCreate({
                            where: { user1ID: req["userID"], user2ID: user.get("userID") }
                        }).then(function (_a) {
                            var conversation = _a[0], isCreated = _a[1];
                            if (isCreated)
                                res.json({
                                    message: "conversation created",
                                    conversation: {
                                        user1ID: conversation.get("user1ID"),
                                        user2ID: conversation.get("user2ID"),
                                        user2: user.toJSON()
                                    }
                                });
                            else
                                res.json({ message: "conversation already exists" });
                        })["catch"](console.log);
                    else
                        res.json({ message: "conversation cannot be created with same number" });
                else
                    res.json({ message: "phone number not exist" });
            });
        }
        else
            res.json({ message: "phone number not provided" });
    };
    ConversationController.deleteConversation = function (req, res) {
        if (req.query.targetID) {
            Conversation_1["default"].destroy({
                where: { user1ID: req["userID"], user2ID: req.query.targetID }
            }).then(function () { return res.json({ message: "conversation deleted" }); })["catch"](console.log);
        }
        else
            res.json({ message: "target id not provided" });
    };
    ConversationController.conversationRead = function (req, res) {
        if (req.body.targetID) {
            Conversation_1["default"].findOne({
                where: { user1ID: req["userID"], user2ID: req.body.targetID }
            }).then(function (conversation) {
                if (conversation) {
                    conversation.set("unreadMessages", 0);
                    conversation.save().then(function () {
                        res.json({
                            message: "conversation updated"
                        });
                    })["catch"](console.log);
                }
            })["catch"](console.log);
        }
        else
            res.json({ message: "target id not provided" });
    };
    return ConversationController;
}());
exports["default"] = ConversationController;
