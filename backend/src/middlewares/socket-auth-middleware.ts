import { JsonWebTokenError, verify } from "jsonwebtoken";
import { Socket } from "socket.io";

/**
 * Authentication middleware for socket io
 * @param socket Socket-io socket instance
 * @param next next function to call next middleware
 */
export default function SocketAuthMiddleware(socket: Socket, next: Function) {

    // Verify if auth token is provided in handshake
    try {
        if (socket.handshake.headers.authorization) {
            const decodedData = verify(socket.handshake.headers.authorization.split(" ")[1], process.env.JWT_PRIVATE_KEY)
            socket["userID"] = decodedData["userID"]
            next()
        }
        else socket.disconnect()

    } catch (error) {

        if (error instanceof JsonWebTokenError) {
            socket.disconnect()
        }
    }
}