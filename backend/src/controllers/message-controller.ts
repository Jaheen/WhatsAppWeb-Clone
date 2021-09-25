import { Request, Response } from "express";
import { Op } from "sequelize";
import Message from "../models/Message";

/**
 * Controller to handle CRUD operations on messages
 */
export default class MessageController {

    /**
     * Get all messages between two users
     * @param req HTTP Request
     * @param res HTTP Response
     */
    static getMessages(req: Request, res: Response) {

        if (req.query.targetID) {
            Message.findAll({
                where: {
                    [Op.or]: [
                        { senderID: req["userID"], recieverID: req.query.targetID },
                        { senderID: req.query.targetID, recieverID: req["userID"] }
                    ]
                }
            }).then(messages => res.json({ messages })).catch(console.log)
        }
    }
}