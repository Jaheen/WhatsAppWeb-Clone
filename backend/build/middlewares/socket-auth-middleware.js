"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
function SocketAuthMiddleware(socket, next) {
    try {
        if (socket.handshake.headers.authorization) {
            var decodedData = jsonwebtoken_1.verify(socket.handshake.headers.authorization.split(" ")[1], process.env.JWT_PRIVATE_KEY);
            socket["userID"] = decodedData["userID"];
            next();
        }
        else
            socket.disconnect();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            socket.disconnect();
        }
    }
}
exports["default"] = SocketAuthMiddleware;
