import {AppThunk} from "../../Redux/Store";
import {RecoveryPasswordApi} from "./RecoveryPasswordApi";
import {AxiosError} from "axios";
import {setStatusApp} from "../../AppReducer";
import {handleError} from "../../common/ErrorUtils/errorFunck";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";


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
export const recoveryPasswordReducer = slice.reducer
export const {setRecoverEmailAC, setRedirectToLoginAC} = slice.actions
export type sliceRecoveryType = ReturnType<typeof slice.getInitialState>


//==============================TC============================

export const forgotPasswordTC = (email: string) => async (dispatch: Dispatch) => {
    dispatch(setStatusApp({status:'loading'}))
    try {
        await RecoveryPasswordApi.recoveryForgotPassword(email)
        dispatch(setRecoverEmailAC({email}))
        dispatch(setStatusApp({status:'succeeded'}))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    }
}

export const setNewPasswordTC = (password: string, token: string) => async (dispatch: Dispatch) => {
    dispatch(setStatusApp({status:'loading'}))
    try {
        await RecoveryPasswordApi.setNewPassword(password, token)
        dispatch(setRedirectToLoginAC({value: true}))
        dispatch(setStatusApp({status:'succeeded'}))

    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    }
}



