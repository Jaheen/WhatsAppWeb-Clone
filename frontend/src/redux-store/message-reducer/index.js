const initState = {
    messages: []
}

export default function MessageReducer(state = initState, action) {
    switch (action.type) {
        case "set-messages":
            if (action.messages)
                return { messages: action.messages }
            else
                return state
        case "append-message":
            if (action.message)
                return { messages: [action.message, ...state.messages] }
            else
                return state
        case "update-message":
            if (action.message) {
                const index = state.messages.findIndex((message) => message.messageID === action.message.messageID)
                state.messages[index] = action.message
                return { messages: [...state.messages] }
            } else
                return state
        case "clear-messages":
            return { messages: [] }
        default:
            return state
    }
}