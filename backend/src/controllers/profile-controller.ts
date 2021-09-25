import { Request, Response } from "express";
import User from "../models/User";

/**
 * Controller to control crud on User profiles
 */
export default class ProfileController {

    /**
     * Get the profile of logged in user
     * @param req HTTP Request
     * @param res HTTP Response
     */
    static getMyProfile(req: Request, res: Response) {
        User.findOne({
            where: { userID: req["userID"] },
            attributes: ["userID", "username", "phoneNumber", "profilePicURL", "description", "lastActive"]
        }).then(user => {
            if (user)
                res.json(user.toJSON())
        }).catch(console.log)
    }

    /**
     * Update username of existing user
     * @param req HTTP Request
     * @param res HTTP Response
     */
    static updateUsername(req: Request, res: Response) {

        if (req.body.username) {
            User.findOne({
                where: { userID: req["userID"] }
            }).then(user => {
                if (user) {
                    user.set("username", req.body.username)
                    user.save()
                    res.json({
                        result: "success"
                    })
                } else res.json({ message: "no such user found" })
            }).catch(console.log)
        } else res.json({ result: "failed", message: "username not provided" })
    }

    /**
     * Update description of existing user
     * @param req HTTP Request
     * @param res HTTP Response
     */
    static updateDescription(req: Request, res: Response) {

        if (req.body.description) {
            User.findOne({
                where: { userID: req["userID"] }
            }).then(user => {
                if (user) {
                    user.set("description", req.body.description)
                    user.save()
                    res.json({
                        result: "success"
                    })
                } else res.json({ message: "no such user found" })
            }).catch(console.log)
        } else res.json({ result: "failed", message: "description not provided" })
    }

    /**
     * Update description of existing user
     * @param req HTTP Request
     * @param res HTTP Response
     */
    static updateProfilePic(req: Request, res: Response) {

        if (req.body.profilePicURL) {
            User.findOne({
                where: { userID: req["userID"] }
            }).then(user => {
                if (user) {
                    user.set("profilePicURL", req.body.profilePicURL)
                    user.save()
                    res.json({
                        result: "success"
                    })
                } else res.json({ message: "no such user found" })
            }).catch(console.log)
        } else res.json({ result: "failed", message: "profile pic URL not provided" })
    }
}