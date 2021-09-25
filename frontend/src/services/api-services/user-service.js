import store from "redux-store"
import { Axios, getAuthHeaders } from "./axios"

/**
 * After authentication add the new user to server
 * @param {string} firebaseToken token recieved from phone auth
 * @param {string} phoneNumber phone number of the authenticated user
 * @returns promise to get custom server token
 */
export async function addUser(firebaseToken, phoneNumber) {
    return new Promise((resolve, reject) => {
        Axios.post("/addUser", { phoneNumber }, {
            headers: {
                authorization: `Bearer ${firebaseToken}`
            }
        }).then((response) => {
            if (response.status === 200)
                if (response.data.result === "success")
                    resolve(response.data.token)
                else reject(response.data.message)
        }).catch(console.log)
    })
}

/**
 * Get my profile data and update state
 */
export function getMyProfile() {
    Axios.get("/getMyProfile", { headers: getAuthHeaders() })
        .then((response) => {
            if (response.status === 200) {
                const action = {
                    type: "set-user-data",
                    userData: {
                        userID: response.data.userID,
                        username: response.data.username,
                        phoneNumber: response.data.phoneNumber,
                        description: response.data.description,
                        profilePicURL: response.data.profilePicURL
                    }
                }
                store.dispatch(action)
            }
        }).catch(console.log)
}

/**
 * Update username on server
 * @param {string} newUsername new username that needs to be changed on server
 */
export function updateUsername(newUsername) {
    Axios.put("/updateUsername", { username: newUsername }, { headers: getAuthHeaders() })
        .then((response) => {
            if (response.status === 200 && response.data.result === "success") {
                const action = {
                    type: "update-username",
                    username: newUsername
                }
                store.dispatch(action)
            }
        }).catch(console.log)
}

/**
 * Update username on server
 * @param {string} newDescription new username that needs to be changed on server
 */
export function updateDescription(newDescription) {
    Axios.put("/updateDescription", { description: newDescription }, { headers: getAuthHeaders() })
        .then((response) => {
            if (response.status === 200 && response.data.result === "success") {
                const action = {
                    type: "update-description",
                    description: newDescription
                }
                store.dispatch(action)
            }
        }).catch(console.log)
}

/**
 * Update username on server
 * @param {string} newProfilePicURL new username that needs to be changed on server
 */
export function updateProfilePicURL(newProfilePicURL) {
    Axios.put("/updateProfilePic", { profilePicURL: newProfilePicURL }, { headers: getAuthHeaders() })
        .then((response) => {
            if (response.status === 200 && response.data.result === "success") {
                const action = {
                    type: "update-profile-pic",
                    profilePicURL: newProfilePicURL
                }
                store.dispatch(action)
            }
        }).catch(console.log)
}
