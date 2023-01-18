import {AppThunk} from "../../Redux/Store";
import {chatAPI} from "./ChatAPI";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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


const slice = createSlice({
    name: 'ChatReducer',
    initialState: initialState,
    reducers: {
        setMessagesAC(state, action: PayloadAction<{ messages: Array<messageType> }>) {
            state.messages = action.payload.messages
        },
        setNewMessageAC(state, action: PayloadAction<{ message: messageType }>) {
            state.messages = [...state.messages, action.payload.message]
        },

    }
})

export const ChatReducer = slice.reducer
export const {setMessagesAC, setNewMessageAC} = slice.actions

export type ChatActionType =
    | ReturnType<typeof setMessagesAC>
    | ReturnType<typeof setNewMessageAC>


export const createConnectionTC = (): AppThunk => (dispatch) => {
    chatAPI.createConnection()
    chatAPI.subscribe((messages) => {
            dispatch(setMessagesAC({messages}))
        },
        (message) => {
            dispatch(setNewMessageAC({message}))
        })

}

export const destroyConnectionTC = (): AppThunk => (dispatch) => {
    chatAPI.destroyConnection()
    dispatch(setMessagesAC({messages: []}))

}