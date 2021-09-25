"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
function AuthMiddleware(req, res, next) {
    try {
        if (req.headers.authorization) {
            if (req.headers.authorization.split(" ")[1].trim() !== "") {
                var decodedData = jsonwebtoken_1.verify(req.headers.authorization.split(" ")[1], process.env.JWT_PRIVATE_KEY);
                req["userID"] = decodedData["userID"];
                next();
            }
            else
                res.json({ message: "auth token not present" });
        }
        else
            res.json({ message: "auth header not present" });
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.JsonWebTokenError)
            res.json({ message: "token error" });
    }
}
exports["default"] = AuthMiddleware;
