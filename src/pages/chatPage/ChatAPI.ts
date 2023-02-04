import {io, Socket} from "socket.io-client";
import {messageType} from "./ChatReducer";

export const chatAPI = {
    socket: null as null | Socket,
    createConnection() {
        this.socket = io('https://neko-back.herokuapp.com/');
        console.log(this.socket)

    },
    subscribe(initMessagesHandler: (messages: Array<messageType>) => void,
              newMessageSentHandler: (message: messageType) => void
    ) {
        this.socket?.on('init-messages-published', initMessagesHandler);
        this.socket?.on('new-message-sent', newMessageSentHandler);

    },
    sentMessage(messageText: string) {
        this.socket?.emit("client-message-sent", messageText)
    },
    destroyConnection() {
        this.socket?.disconnect()
        this.socket = null

    }

}
