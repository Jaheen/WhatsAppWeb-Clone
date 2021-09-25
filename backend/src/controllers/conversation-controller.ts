import { Request, Response } from "express";
import Conversation from "../models/Conversation";
import Message from "../models/Message";
import User from "../models/User";

/**
 * Controller class to handle routes on chats
 */
export default class ConversationController {

    /**
     * Get all my recent chats
     * @param req HTTP request
     * @param res HTTP response
     */
    static getConversations(req: Request, res: Response) {
        Conversation.findAll({
            where: { user1ID: req["userID"] },
            include: [
                { model: User, as: "user2", attributes: ["userID", "username", "phoneNumber", "profilePicURL", "description", "lastActive"] },
                { model: Message, as: "lastMessage", attributes: ["messageID", "senderID", "recieverID", "contentType", "content", "timestamp"] }
            ],
            attributes: ["user1ID", "user2ID", "unreadMessages"],
            order: [["updatedAt", "DESC"]]
        }).then(conversations => res.json({ conversations })).catch(console.log)
    }

    /**
     * Create a Conversation between two users
     * @param req HTTP Request
     * @param res HTTP Response
     */
    static createConversation(req: Request, res: Response) {

        if (req.body.phoneNumber) {
            User.findOne({
                where: { phoneNumber: req.body.phoneNumber },
                attributes: ["userID", "username", "phoneNumber", "profilePicURL", "description", "lastActive"]
            }).then(user => {

                if (user)
                    if (user.get("userID") !== req["userID"])

                        Conversation.findOrCreate({
                            where: { user1ID: req["userID"], user2ID: user.get("userID") }
                        }).then(([conversation, isCreated]) => {
                            if (isCreated)
                                res.json({
                                    result: "success",
                                    conversation: {
                                        user1ID: conversation.get("user1ID"),
                                        user2ID: conversation.get("user2ID"),
                                        user2: user.toJSON()
                                    }
                                })
                            else res.json({ message: "conversation already exists" })
                        }).catch(console.log)

                    else res.json({ message: "You cannot create a conversation with yourself" })
                else res.json({ message: "Phone number not exist" })
            })
        } else res.json({ message: "phone number not provided" })
    }

    /**
     * Delete a conversation between two users
     * @param req HTTP Request
     * @param res HTTP Response
     */
    static deleteConversation(req: Request, res: Response) {

        if (req.query.targetID) {
            Conversation.destroy({
                where: { user1ID: req["userID"], user2ID: req.query.targetID }
            }).then(() => res.json({ message: "conversation deleted" })).catch(console.log)
        } else res.json({ message: "target id not provided" })
    }
}
