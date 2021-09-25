import { io } from "socket.io-client"

const socket = io("http://192.168.225.57:8080", {
    extraHeaders: {
        authorization: `Bearer ${window.localStorage.getItem("server-auth-token")}`
    }
})

export default socket;
