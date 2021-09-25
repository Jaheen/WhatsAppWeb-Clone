const initState = {
    conversations: [],
    activeConversationID: ""
}

/**
 * Reducer to handle conversations between users
 * @param state previous state
 * @param action action with payload to be modified in the state
 * @returns returns updated state
 */
export default function ConversationReducer(state = initState, action) {
    switch (action.type) {
        case "set-conversations":
            if (action.conversations)
                return { ...state, conversations: action.conversations }
            else
                return state
        case "add-new-conversation":
            if (action.conversation)
                return { ...state, conversations: [action.conversation, ...state.conversations] }
            else
                return state
        case "update-conversation":
            if (action.conversation) {
                const filteredConversations = state.conversations.filter(conversation => conversation.userID !== action.conversation.userID)
                return { ...state, conversations: [action.conversation, ...filteredConversations] }
            }
            else
                return state
        case "remove-conversation":
            if (action.targetID) {
                const filteredConversations = state.conversations.filter(conversation => conversation.userID !== action.targetID)
                return { ...state, conversations: filteredConversations }
            }
            else
                return state
        case "set-active-conversation-ID":
            return { ...state, activeConversationID: action.targetID }
        default:
            return state
    }
}