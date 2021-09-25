import store from "redux-store"
import socket from "./socket"

/**
 * Handler for the message arrived socket event
 */
export function onMessageArrived (message) {
	console.log(message)

	const { conversations, activeConversationID } = store.getState().conversationReducer
    const isConversationActive = activeConversationID === message.senderID

    if(isConversationActive) {
    	const activeConversation = conversations.find(conversation => conversation.userID === activeConversationID)
    	store.dispatch({
    		type: "update-conversation",
    		conversation: {
    			...activeConversation,
    			lastMessage: message.content
    		}
    	})
    	store.dispatch({
    		type: "append-message",
    		message
    	})
    	conversationRead(activeConversationID)
    } else {
    	if(message.newConversation) {
    		store.dispatch({
    			type: "add-new-conversation",
    			conversation: {
				    userID: message.newConversation.userID,
				    username: message.newConversation.username,
				    phoneNumber: message.newConversation.phoneNumber,
				    description: message.newConversation.description,
				    lastActive: message.newConversation.lastActive,
				    lastMessage: message.content,
				    profilePicURL: message.newConversation.profilePicURL,
				    unreadMessages: isConversationActive ? 0 : 1
				}
    		})
    	} else {
    		const conversation = conversations.find(conversation => conversation.userID === message.senderID)
    		if(conversation) {
    			store.dispatch({
    				type: "update-conversation",
    				conversation: {
    					...conversation,
    					lastMessage: message.content,
    					unreadMessages: conversation.unreadMessages + 1
    				}
    			})
    		}
    	}
    }
}

/**
 * When message by other user is deleted update state
 */
export function onMessageDeleted (message) {
	console.log("Deleted Message is ", message)
	store.dispatch({
		type: "update-message",
		message
	})
}

/**
 * Send message to server and update state when server reached
 * @param {string} message Message to be sent through socket io
 */
export function sendMessage (message) {
	socket.emit("outgoing-message", message)
		.once("message-sent", (message) => {
			store.dispatch({
				type: "append-message",
				message
			})
			const { activeConversationID, conversations } = store.getState().conversationReducer
			const activeConversation = conversations.find(conversation => conversation.userID === activeConversationID)
			activeConversation.lastMessage = message.content;
			store.dispatch({
				type: "update-conversation",
				conversation: activeConversation
			})
		})
}

/**
 * Delete message on server and update state
 * @param {string} message Message to be deleted
 */
export function deleteMessage (messageID) {
	socket.emit("delete-message", messageID)
}

/**
 * When user reads conversation update state and inform server
 * @param targetID id of the other user (conversation)
 */
export function conversationRead(targetID) {
    const conversation = store.getState().conversationReducer.conversations.find(conversation => conversation.userID === targetID)
    if (conversation && conversation.unreadMessages > 0) {
        socket.emit("conversation-read", targetID)
        if(conversation.unreadMessages > 0) {
        	conversation.unreadMessages = 0
        	store.dispatch({
        		type: "update-conversation",
        		conversation
        	})
        }
    }
}
