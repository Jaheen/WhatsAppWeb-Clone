import axios from "axios"

export const Axios = axios.create({
    baseURL: "http://192.168.225.57:8080/api"
})

export function getAuthHeaders() {
    return {
        authorization: `Bearer ${window.localStorage.getItem("server-auth-token")}`
    }
}
