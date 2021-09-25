/**
 * Initial state of the reducer
 */
const initialState = {
    userID: "",
    username: "",
    description: "",
    profilePicURL: "",
    phoneNumber: ""
}

/**
 * User Reducer to handle the state of the logged user
 * @param state state of the user reducer defaults to initial state
 * @param action action dispatched by the dispatchers
 */
export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case "set-user-data":
            return { ...action.userData }
        case "update-username":
            return { ...state, username: action.username }
        case "update-description":
            return { ...state, description: action.description }
        case "update-profile-pic":
            return { ...state, profilePicURL: action.profilePicURL }
        default:
            return state
    }
}