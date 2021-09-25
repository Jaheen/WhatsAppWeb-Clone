"use strict";
exports.__esModule = true;
var socket_io_1 = require("socket.io");
var socket_messaging_controller_1 = require("./controllers/socket-messaging-controller");
var socket_auth_middleware_1 = require("./middlewares/socket-auth-middleware");
var Conversation_1 = require("./models/Conversation");
var User_1 = require("./models/User");
function initSocketIO(server) {
    var io = new socket_io_1.Server(server, {
        allowEIO3: true,
        cors: {}
    });
    io.use(socket_auth_middleware_1["default"]);
    io.on("connection", function (socket) {
        if (!socket.rooms.has(socket["userID"]))
            socket.join(socket["userID"]);
        io.emit("user-online", socket["userID"]);
        User_1["default"].update({ lastActive: "now" }, { where: { userID: socket["userID"] } }).then(function (user) {
            io.emit("user-online", socket["userID"]);
        })["catch"](console.log);
        socket.on("outgoing-message", function (message) { return socket_messaging_controller_1["default"].onOutgoingMessageArrived(io, socket, message); });
        socket.on("delete-message", function (message) { return socket_messaging_controller_1["default"].onDeleteMessage(io, socket, message); });
        socket.on("conversation-read", function (targetID) {
            Conversation_1["default"].update({ unreadMessages: 0 }, { where: { user1ID: socket["userID"], user2ID: targetID } })["catch"](console.log);
        });
        socket.once("disconnect", function () {
            io["in"](socket["userID"]).allSockets().then(function (sockets) {
                if (sockets.size === 0) {
                    User_1["default"].update({ lastActive: Date.now().toString() }, { where: { userID: socket["userID"] } }).then(function (user) {
                        io.emit("user-offline", socket["userID"]);
                        socket.leave(socket["userID"]);
                    })["catch"](console.log);
                }
                else {
                    socket.leave(socket["userID"]);
                }
            });
        });
    });
}
exports["default"] = initSocketIO;
