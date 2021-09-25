import store from "redux-store";
import { Axios, getAuthHeaders } from "./axios";

/**
 * Get all my recent conversations and update state
 */
export function getMyConversations() {
    Axios.get("/getConversations", { headers: getAuthHeaders() })
        .then((response) => {
            if (response.status === 200) {
                const action = {
                    type: "set-conversations",
                    conversations: []
                }
                response.data.conversations.forEach((conversation) => {
                    action.conversations?.push({
                        userID: conversation.user2.userID,
                        username: conversation.user2.username,
                        phoneNumber: conversation.user2.phoneNumber,
                        profilePicURL: conversation.user2.profilePicURL,
                        description: conversation.user2.description,
                        lastActive: conversation.user2.lastActive,
                        lastMessage: conversation.lastMessage ? conversation.lastMessage.content : "",
                        unreadMessages: conversation.unreadMessages
                    })
                });
                store.dispatch(action)
            }
        })
}

/**
 * Create a new conversation with a user
 * @param phoneNumber phone number of that user to whom conversation needs to be created
 */
export function createConversation(phoneNumber) {
    return new Promise((resolve, reject) => {
        Axios.post("/createConversation", { phoneNumber }, { headers: getAuthHeaders() })
            .then((response) => {
                if (response.status === 200 && response.data.result === "success") {
                    const action = {
                        type: "add-new-conversation",
                        conversation: {
                            userID: response.data.conversation.user2.userID,
                            username: response.data.conversation.user2.username,
                            phoneNumber: response.data.conversation.user2.phoneNumber,
                            profilePicURL: response.data.conversation.user2.profilePicURL,
                            description: response.data.conversation.user2.description,
                            lastActive: response.data.conversation.user2.lastActive,
                            lastMessage: "",
                            unreadMessages: 0
                        }
                    }
                    store.dispatch(action)
                    resolve()
                } else if(response.data.message) {
                    reject(response.data.message)
                }
            }).catch(console.log)
    })
}

/**
 * Delete a conversation with a user
 * @param targetID ID of that user to delete conversation
 */
export function deleteConversation(targetID) {
    Axios.delete(`deleteConversation?targetID=${targetID}`, { headers: getAuthHeaders() })
        .then((response) => {
            if (response.status === 200) {
                const action = {
                    type: "remove-conversation",
                    targetID
                }
                store.dispatch(action)
            }
        })
}
