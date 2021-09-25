"use strict";
exports.__esModule = true;
var firebase_admin_1 = require("firebase-admin");
function FirebaseAuthMiddleware(req, res, next) {
    if (req.headers.authorization)
        if (req.headers.authorization.split(" ")[1])
            firebase_admin_1.auth().verifyIdToken(req.headers.authorization.split(" ")[1])
                .then(function (decodedToken) {
                req["phoneNumber"] = decodedToken.phone_number;
                next();
            })["catch"](function () { return res.json({ result: "failed", message: "token error" }); });
        else
            res.json({ result: "failed", message: "token not found" });
    else
        res.json({ result: "failed", message: "auth header not found" });
}
exports["default"] = FirebaseAuthMiddleware;
