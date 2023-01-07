import {setStatusApp} from "../../AppReducer";
import {handleError} from "../../common/ErrorUtils/errorFunck";
import {AppThunk} from "../../Redux/Store";
import {AxiosError} from "axios";
import {chatAPI} from "./ChatAPI";

const initialState = {
    messages: [] as Array<messageType>
}
export type messageType = {
    _id: string
    message: string
    user: {
        _id: string
        name: string
    }
}
type InitialStateType = typeof initialState

export const ChatReducer = (state: InitialStateType = initialState, action: ChatActionType): InitialStateType => {
    switch (action.type) {
        case "CHAT/SET-MESSAGES": {
            return {...state, messages: action.messages}
        }

        case "CHAT/SET-NEW-MESSAGES":
            return {...state, messages: [...state.messages, action.message]}
        default:
            return state
    }
}


export type ChatActionType = setMessagesACType | setNewMessageACType

export type setMessagesACType = ReturnType<typeof setMessagesAC>
export const setMessagesAC = (messages: Array<messageType>) => {
    debugger
    return {type: 'CHAT/SET-MESSAGES', messages} as const
}

export type setNewMessageACType = ReturnType<typeof setNewMessageAC>
export const setNewMessageAC = (message: messageType) => ({type: 'CHAT/SET-NEW-MESSAGES', message} as const)


export const createConnectionTC = (): AppThunk => (dispatch) => {


    chatAPI.createConnection()
    // chatAPI.subscribe((messages) => {
    //         dispatch(setMessagesAC(messages))
    //     },
    //     (message) => {
    //         dispatch(setNewMessageAC(message))
    //     })

}

