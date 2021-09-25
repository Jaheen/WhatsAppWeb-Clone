import { storage } from "firebase-admin";
import { Op } from "sequelize";
import { Server, Socket } from "socket.io";
import Conversation from "../models/Conversation";
import Message from "../models/Message";
import User from "../models/User";

interface SocketMessage {
    messageID: string
    senderID: string
    recieverID: string
    contentType: "TEXT" | "LINK" | "IMAGE" | "VIDEO" | "AUDIO"
    content: string
    timestamp: string
}
interface IncomingMessage extends SocketMessage {
    newConversation?: {
        userID: string
        username: string
        phoneNumber: string
        description: string
        profilePicURL: string
        lastActive: string
    }
}
interface OutgoingMessage extends SocketMessage { }

export default class SocketMessagingController {

    /**
     * When client sends outgoing message, store it in the database and emit to the reciever
     * @param io server instance for handling global tasks
     * @param socket socket instance of emitting socket
     * @param message outgoing message to be sent as incoming message to the reciever
     */
    static onOutgoingMessageArrived(io: Server, socket: Socket, message: OutgoingMessage) {
        Message.create({
            senderID: socket["userID"],
            recieverID: message.recieverID,
            contentType: message.contentType,
            content: message.content,
            timestamp: message.timestamp
        }).then(newMessage => {
            if (newMessage) {
                message.messageID = newMessage.get("messageID") as string
                Conversation.findOrCreate({ where: { user1ID: message.recieverID, user2ID: socket["userID"] } })
                    .then(([conversation, isCreated]) => {
                        if (isCreated) {
                            User.findOne({
                                where: { userID: conversation.get("user2ID") },
                                attributes: ["userID", "username", "phoneNumber", "profilePicURL", "description", "lastActive"]
                            }).then(user => {
                                if (user) {
                                    const incomingMessage: IncomingMessage = { ...message, newConversation: user.get() }
                                    Conversation.update({ lastMessageID: newMessage.get("messageID") }, {
                                        where: {
                                            [Op.or]: [
                                                { user1ID: socket["userID"], user2ID: message.recieverID },
                                                { user1ID: message.recieverID, user2ID: socket["userID"] }
                                            ]
                                        }
                                    }).then(() => {
                                        io.to(message.recieverID).emit("incoming-message", incomingMessage)
                                        socket.emit("message-sent", message)
                                    }).catch(console.log)
                                }
                            }).catch(console.log)
                        } else {
                            const incomingMessage: IncomingMessage = message
                            Conversation.update({ lastMessageID: newMessage.get("messageID") }, {
                                where: {
                                    [Op.or]: [
                                        { user1ID: socket["userID"], user2ID: message.recieverID },
                                        { user1ID: message.recieverID, user2ID: socket["userID"] }
                                    ]
                                }
                            }).then(() => {
                                io.to(message.recieverID).emit("incoming-message", incomingMessage)
                                socket.emit("message-sent", message)
                            }).catch(console.log)
                        }
                        conversation.set("unreadMessages", (conversation.get("unreadMessages") as number) + 1)
                        conversation.save()
                    }).catch(console.log)
            }
        }).catch(console.log)
    }

    /**
     * When client sends delete message event update database and emit event
     * @param io server instance for doing global tasks
     * @param socket socket instance of the emitting socket
     * @param message message to be deleted
     */
    static onDeleteMessage(io: Server, socket: Socket, messageID: string) {
        Message.findOne({
            where: { messageID },
            attributes: ["messageID", "senderID", "recieverID", "contentType", "content", "timestamp"]
        }).then(message => {
            if (message.get("senderID") === socket["userID"]) {
                message.set("contentType", "TEXT")
                message.set("content", "This message was deleted")
                message.save().then(updatedMessage => {
                    io.to([message.get("senderID") as string, message.get("recieverID") as string]).emit("message-deleted", updatedMessage.toJSON())
                }).catch(console.log)
            }
        }).catch(console.log)
    }
}