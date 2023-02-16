import {chatApi} from "../api/Chat-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch} from "./Store";

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

export const chatReducer = slice.reducer
export const {setMessagesAC, setNewMessageAC} = slice.actions


export const createConnectionTC = () => (dispatch: AppDispatch) => {
    chatApi.createConnection()
    chatApi.subscribe((messages) => {
            dispatch(setMessagesAC({messages}))
        },
        (message) => {
            dispatch(setNewMessageAC({message}))
        })

}

export const destroyConnectionTC = () => (dispatch: AppDispatch) => {
    chatApi.destroyConnection()
    dispatch(setMessagesAC({messages: []}))

}

export const sentMessageTC = (message: string) => (dispatch: AppDispatch) => {
    chatApi.sentMessage(message)
}