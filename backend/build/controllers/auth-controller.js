"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
var User_1 = require("../models/User");
var AuthController = (function () {
    function AuthController() {
    }
    AuthController.addUser = function (req, res) {
        User_1["default"].findOrCreate({
            where: {
                phoneNumber: req["phoneNumber"]
            }
        }).then(function (_a) {
            var user = _a[0], isCreated = _a[1];
            if (user || isCreated) {
                res.json({
                    result: "success",
                    token: jsonwebtoken_1.sign(user.toJSON(), process.env.JWT_PRIVATE_KEY)
                });
            }
            else
                res.json({ result: "failed", message: "cannot create user" });
        })["catch"](console.log);
    };
    return AuthController;
}());
exports["default"] = AuthController;
