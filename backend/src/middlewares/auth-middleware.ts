import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, verify } from "jsonwebtoken";

/**
 * Authentication middleware to verify JWT token authentication
 * @param req HTTP request
 * @param res HTTP response
 * @param next Next function to call next middleware
 */
export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    try {

        // Check if auth header is present and token is not empty string
        if (req.headers.authorization) {
            if (req.headers.authorization.split(" ")[1].trim() !== "") {

                // set decoded userID to request object
                const decodedData = verify(req.headers.authorization.split(" ")[1], process.env.JWT_PRIVATE_KEY)
                req["userID"] = decodedData["userID"]
                next()

            } else res.json({ message: "auth token not present" })
        } else res.json({ message: "auth header not present" })

    } catch (error) {

        if (error instanceof JsonWebTokenError)
            res.json({ message: "token error" })
    }
}