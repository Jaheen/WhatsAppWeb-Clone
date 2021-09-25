import socket from "./socket"
import { onMessageArrived, onMessageDeleted } from "./socket-messaging-service"
import { onUserOnline, onUserOffline } from "./socket-user-service"

export function initSocketService () {
	socket.on("incoming-message", onMessageArrived)
	socket.on("message-deleted", onMessageDeleted)
	socket.on("user-online", onUserOnline)
	socket.on("user-offline", onUserOffline)
	console.log("socket listeners initialized")
}
