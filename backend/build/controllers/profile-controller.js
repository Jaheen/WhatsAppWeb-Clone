"use strict";
exports.__esModule = true;
var User_1 = require("../models/User");
var ProfileController = (function () {
    function ProfileController() {
    }
    ProfileController.getMyProfile = function (req, res) {
        User_1["default"].findOne({
            where: { userID: req["userID"] },
            attributes: ["userID", "username", "phoneNumber", "profilePicURL", "description", "lastActive"]
        }).then(function (user) {
            if (user)
                res.json(user.toJSON());
        })["catch"](console.log);
    };
    ProfileController.updateUsername = function (req, res) {
        if (req.body.username) {
            User_1["default"].findOne({
                where: { userID: req["userID"] }
            }).then(function (user) {
                if (user) {
                    user.set("username", req.body.username);
                    user.save();
                    res.json({
                        result: "success"
                    });
                }
                else
                    res.json({ message: "no such user found" });
            })["catch"](console.log);
        }
        else
            res.json({ result: "failed", message: "username not provided" });
    };
    ProfileController.updateDescription = function (req, res) {
        if (req.body.description) {
            User_1["default"].findOne({
                where: { userID: req["userID"] }
            }).then(function (user) {
                if (user) {
                    user.set("description", req.body.description);
                    user.save();
                    res.json({
                        result: "success"
                    });
                }
                else
                    res.json({ message: "no such user found" });
            })["catch"](console.log);
        }
        else
            res.json({ result: "failed", message: "description not provided" });
    };
    ProfileController.updateProfilePic = function (req, res) {
        if (req.body.profilePicURL) {
            User_1["default"].findOne({
                where: { userID: req["userID"] }
            }).then(function (user) {
                if (user) {
                    user.set("profilePicURL", req.body.profilePicURL);
                    user.save();
                    res.json({
                        result: "success"
                    });
                }
                else
                    res.json({ message: "no such user found" });
            })["catch"](console.log);
        }
        else
            res.json({ result: "failed", message: "profile pic URL not provided" });
    };
    return ProfileController;
}());
exports["default"] = ProfileController;
