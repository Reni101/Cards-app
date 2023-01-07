import {io, Socket} from "socket.io-client";
import {messageType} from "./ChatReducer";


//const socket = socketIo("https://neko-back.herokuapp.com/");
//(messages: Array<{
//             _id: string
//             message: string
//             user: {
//                 _id: string
//                 name: string
//             }
//         }>) => {
//         })
export const chatAPI = {
    socket: null as null | Socket,
    createConnection() {
        this.socket = io("https://neko-back.herokuapp.com/");
    },
    subscribe(initMessagesHandler: (messages: Array<messageType>) => void,
              newMessageSentHandler:(message:messageType)=>void
              ) {
        this.socket?.on('init-messages-published', initMessagesHandler);
        this.socket?.on('new-message-sent', newMessageSentHandler);

    }

}