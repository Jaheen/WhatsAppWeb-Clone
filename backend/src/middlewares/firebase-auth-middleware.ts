import { NextFunction, Request, Response } from "express";
import { auth } from "firebase-admin";

/**
 * Middleware to verify firebase JWT token
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Next function to call next middleware
 */
export default function FirebaseAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    
    if (req.headers.authorization)
        if (req.headers.authorization.split(" ")[1])
            auth().verifyIdToken(req.headers.authorization.split(" ")[1])
                .then((decodedToken: auth.DecodedIdToken) => {
                    req["phoneNumber"] = decodedToken.phone_number
                    next()
                }).catch(() => res.json({ result: "failed", message: "token error" }))
        else res.json({ result: "failed", message: "token not found" })
    else res.json({ result: "failed", message: "auth header not found" })
}