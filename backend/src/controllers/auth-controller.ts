import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import User from "../models/User";

/**
 * Controller to handle authentication tasks
 */
export default class AuthController {

    /**
     * Authenticate existing user
     * @param req HTTP Request
     * @param res HTTP Response
     */
    static addUser(req: Request, res: Response) {

        User.findOrCreate({
            where: {
                phoneNumber: req["phoneNumber"]
            }
        }).then(([user, isCreated]) => {
            if (user || isCreated) {
                res.json({
                    result: "success",
                    token: sign(user.toJSON(), process.env.JWT_PRIVATE_KEY)
                })
            } else res.json({ result: "failed", message: "cannot create user" })
        }).catch(console.log)
    }
}
