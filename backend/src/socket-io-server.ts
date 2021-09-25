import * as http from "http";
import { Server, Socket } from "socket.io";
import SocketMessagingController from "./controllers/socket-messaging-controller";
import SocketAuthMiddleware from "./middlewares/socket-auth-middleware";
import Conversation from "./models/Conversation";
import User from "./models/User";

/**
 * Initilize socket io server using http server
 * @param server http server
 */
export default function initSocketIO(server: http.Server) {
    const io = new Server(server, {
        allowEIO3: true,
        cors: {}
    })

    io.use(SocketAuthMiddleware)

    io.on("connection", (socket: Socket) => {

        // Join user's room if not joined
        if (!socket.rooms.has(socket["userID"]))
            socket.join(socket["userID"])
        // Update user's online status
        io.emit("user-online", socket["userID"])

        // Emit user is online
        User.update({ lastActive: "now" }, { where: { userID: socket["userID"] } }).then(user => {
            io.emit("user-online", socket["userID"])
        }).catch(console.log)

        /**
         * When client sends outgoing message store and forward it as incoming message
         */
        socket.on("outgoing-message", (message) => SocketMessagingController.onOutgoingMessageArrived(io, socket, message))

        /**
         * When client sends delete message delete the message and send the response
         */
        socket.on("delete-message", (message) => SocketMessagingController.onDeleteMessage(io, socket, message))

        /**
         * When client views a conversation mark unread messages as 0
         */
        socket.on("conversation-read", (targetID: string) => {
            Conversation.update({ unreadMessages: 0 }, { where: { user1ID: socket["userID"], user2ID: targetID } })
                .catch(console.log)
        })
        
        /**
         * When a client disconnects if there is no client for that userID 
         * then update database and inform all clients it is offline
         * otherwise simply leave user room
         */
        socket.once("disconnect", () => {
            io.in(socket["userID"]).allSockets().then(sockets => {
                if (sockets.size === 0) {
                    User.update({ lastActive: Date.now().toString() }, { where: { userID: socket["userID"] } }).then(user => {
                        io.emit("user-offline", socket["userID"])
                        socket.leave(socket["userID"])
                    }).catch(console.log)
                } else {
                    socket.leave(socket["userID"])
                }
            })
        })
    })
}
