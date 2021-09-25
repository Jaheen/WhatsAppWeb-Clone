"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var Message_1 = require("../models/Message");
var MessageController = (function () {
    function MessageController() {
    }
    MessageController.getMessages = function (req, res) {
        var _a;
        if (req.query.targetID) {
            Message_1["default"].findAll({
                where: (_a = {},
                    _a[sequelize_1.Op.or] = [
                        { senderID: req["userID"], recieverID: req.query.targetID },
                        { senderID: req.query.targetID, recieverID: req["userID"] }
                    ],
                    _a)
            }).then(function (messages) { return res.json({ messages: messages }); })["catch"](console.log);
        }
    };
    return MessageController;
}());
exports["default"] = MessageController;
