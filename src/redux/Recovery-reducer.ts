import {AppDispatch} from "./Store";
import {RecoveryApi} from "../api/Recovery-api";
import {AxiosError} from "axios";
import {setStatusApp} from "./App-reducer";
import {handleError} from "../common/errorUtils/errorFunction";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "recoveryPasswordReducer",
    initialState: {
        email: null as string | null,
        isRedirectToLogin: false as boolean
    },
    reducers: {
        setRecoverEmailAC(state, action: PayloadAction<{ email: string | null }>) {
            state.email = action.payload.email
        },
        setRedirectToLoginAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isRedirectToLogin = action.payload.value
        }
    }
})

export const recoveryReducer = slice.reducer
export const {setRecoverEmailAC, setRedirectToLoginAC} = slice.actions
export type sliceRecoveryType = ReturnType<typeof slice.getInitialState>


//==============================TC============================

export const forgotPasswordTC = (email: string) => async (dispatch:AppDispatch) => {
    dispatch(setStatusApp({status:'loading'}))
    try {
        await RecoveryApi.recoveryForgotPassword(email)
        dispatch(setRecoverEmailAC({email}))
        dispatch(setStatusApp({status:'succeeded'}))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    }
}

export const setNewPasswordTC = (password: string, token: string) => async (dispatch:AppDispatch) => {
    dispatch(setStatusApp({status:'loading'}))
    try {
        await RecoveryApi.setNewPassword(password, token)
        dispatch(setRedirectToLoginAC({value: true}))
        dispatch(setStatusApp({status:'succeeded'}))

    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    }
}



