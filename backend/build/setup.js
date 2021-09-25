"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
var Conversation_1 = require("./models/Conversation");
var Message_1 = require("./models/Message");
var User_1 = require("./models/User");
function setup() {
    dotenv.config();
    User_1["default"].sync().then(function () { return console.log("USERS TABLE SYNCED SUCCESSFULLY"); })["catch"](console.log);
    Conversation_1["default"].sync().then(function () { return console.log("CONVERSATIONS TABLE SYNCED SUCCESSFULLY"); })["catch"](console.log);
    Message_1["default"].sync().then(function () { return console.log("MESSAGES TABLE SYNCED SUCCESSFULLY"); })["catch"](console.log);
}
exports["default"] = setup;
