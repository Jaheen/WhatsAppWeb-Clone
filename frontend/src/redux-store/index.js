import { combineReducers, createStore } from "redux";
import UserReducer from "./user-reducer"
import ConversationReducer from  "./conversation-reducer"
import MessageReducer from "./message-reducer"
import AppReducer from "./app-reducer"

function activateReduxDevTools() {
    if (process.env.NODE_ENV !== "production") {
        if (window.__REDUX_DEVTOOLS_EXTENSION__)
            return window.__REDUX_DEVTOOLS_EXTENSION__()
    }
}

/**
 * Root Reducer that contains all reducers
 */
const rootReducer = combineReducers({
    userReducer: UserReducer,
    conversationReducer: ConversationReducer,
    appReducer: AppReducer,
    messageReducer: MessageReducer
})

/**
 * Redux store for global state
 */
export default createStore(rootReducer, activateReduxDevTools())
