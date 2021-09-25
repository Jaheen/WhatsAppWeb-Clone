import store from "redux-store";
import { Axios, getAuthHeaders } from "./axios";

/**
 * Get all messages bettween two users
 * @param targetID ID of the other user
 */
export function getMessages(targetID) {
    Axios.get(`/getMessages`, { headers: getAuthHeaders(), params: { targetID } })
        .then((response) => {
            if (response.status === 200) {
                const action = {
                    type: "set-messages",
                    messages: []
                }
                response.data.messages.forEach((message) => {
                    action.messages?.push({
                        messageID: message.messageID,
                        senderID: message.senderID,
                        recieverID: message.recieverID,
                        contentType: message.contentType,
                        content: message.content,
                        timestamp: message.timestamp
                    })
                })
                action.messages?.reverse()
                store.dispatch(action)
            }
        }).catch(console.log)
}
