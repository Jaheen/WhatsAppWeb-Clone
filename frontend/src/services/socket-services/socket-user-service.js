import store from "redux-store"

/**
 * When a user in conversations comes online update state
 * @param {string} userID user id of the target user
 */
export function onUserOnline (userID) {
	const { conversations, activeConversationID } = store.getState().conversationReducer
	const conversation = conversations.find(conversation => conversation.userID === activeConversationID)
	if(conversation) {
		conversation.lastActive = "now"
		store.dispatch({
			type: "update-conversation",
			conversation
		})
	}
}

/**
 * When user goes offline update state
 * @param {string} userID user if the user in conversation
 */
 export function onUserOffline (userID) {
 	const { conversations, activeConversationID } = store.getState().conversationReducer
	const conversation = conversations.find(conversation => conversation.userID === activeConversationID)
	if(conversation) {
		conversation.lastActive = Date.now().toString()
		store.dispatch({
			type: "update-conversation",
			conversation
		})
	}
 }
