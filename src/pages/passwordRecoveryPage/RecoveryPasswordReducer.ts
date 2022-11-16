import {AppThunk} from "../../Redux/Store";
import {RecoveryPasswordApi} from "./RecoveryPasswordApi";
import axios, {AxiosError} from "axios";
import {setErrorApp, setStatusApp} from "../../AppReducer";


const initialState = {
    email: null as string | null,
    isRedirectToLogin: false
}

type InitialStateType = typeof initialState

export const forgotPasswordReducer = (state: InitialStateType = initialState, action: ActionsForgotType): InitialStateType => {
    switch (action.type) {
        case "FORGOT/REDIRECT_TO_LOGIN":
            return {...state, isRedirectToLogin: action.value}
        case "FORGOT/SET_RECOVER_EMAIL":
            return {...state, email: action.email}
        default:
            return state
    }
}
//=============================AC======================================
export const setRecoverEmailAC = (email: string) => ({
    type: 'FORGOT/SET_RECOVER_EMAIL',
    email

} as const)
export const setRedirectToLoginAC = (value: boolean) => ({
    type: 'FORGOT/REDIRECT_TO_LOGIN',
    value

} as const)


//==============================TC============================

export const forgotPasswordTC = (email: string): AppThunk => async dispatch => {
    try {
//включить крутилку
        await RecoveryPasswordApi.recoveryForgotPassword(email)
        dispatch(setRecoverEmailAC(email))
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
            dispatch(setErrorApp(error))
        } else {
            dispatch(setErrorApp(`Native error ${err.message}`))

        }
        dispatch(setStatusApp('failed'))
    }
}

export const setNewPasswordTC = (password: string, token: string): AppThunk => async dispatch => {

    try {
        await RecoveryPasswordApi.setNewPassword(password, token)
        dispatch(setRedirectToLoginAC(true))


    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
            dispatch(setErrorApp(error))
        } else {
            dispatch(setErrorApp(`Native error ${err.message}`))

        }
        dispatch(setStatusApp('failed'))
    }
}


//

export type ActionsForgotType =
    | ReturnType<typeof setRecoverEmailAC>
    | ReturnType<typeof setRedirectToLoginAC>

