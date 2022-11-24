import {AppThunk} from "../../Redux/Store";
import {RecoveryPasswordApi} from "./RecoveryPasswordApi";
import  {AxiosError} from "axios";
import { setStatusApp} from "../../AppReducer";
import {handleError} from "../../common/ErrorUtils/errorFunck";


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
export const setRecoverEmailAC = (email: string | null) => ({
    type: 'FORGOT/SET_RECOVER_EMAIL',
    email

} as const)
export const setRedirectToLoginAC = (value: boolean) => ({
    type: 'FORGOT/REDIRECT_TO_LOGIN',
    value

} as const)


//==============================TC============================

export const forgotPasswordTC = (email: string): AppThunk => async dispatch => {
    dispatch(setStatusApp('loading'))
    try {
        await RecoveryPasswordApi.recoveryForgotPassword(email)
        dispatch(setRecoverEmailAC(email))
        dispatch(setStatusApp('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err,dispatch)
    }
}

export const setNewPasswordTC = (password: string, token: string): AppThunk => async dispatch => {
    dispatch(setStatusApp('loading'))
    try {
        await RecoveryPasswordApi.setNewPassword(password, token)
        dispatch(setRedirectToLoginAC(true))
        dispatch(setStatusApp('succeeded'))

    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err,dispatch)
    }
}


//

export type ActionsForgotType =
    | ReturnType<typeof setRecoverEmailAC>
    | ReturnType<typeof setRedirectToLoginAC>

