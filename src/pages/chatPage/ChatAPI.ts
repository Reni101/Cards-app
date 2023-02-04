import {io, Socket} from "socket.io-client";
import {messageType} from "./ChatReducer";

export const chatAPI = {
    socket: null as null | Socket,
    createConnection(_id: string, name: string, avatar: string | null) {
        this.socket = io('https://neko-back.herokuapp.com/', {
            query: {_id, name, avatar}
        });
        this.socket?.emit("init")

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
