import {AppThunk} from "../../Redux/Store";
import {RecoveryPasswordApi} from "./RecoveryPasswordApi";


const initialState = {
    email: null as string | null
}

type InitialStateType = typeof initialState

export const forgotPasswordReducer = (state: InitialStateType = initialState, action: ActionsForgotType): InitialStateType => {
    switch (action.type) {
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


//==============================TC============================

export const forgotPasswordTC = (email: string): AppThunk => async dispatch => {
    try {
//включить крутилку
        const res = await RecoveryPasswordApi.recoveryForgotPassword(email)
        dispatch(setRecoverEmailAC(email))
    } catch (e) {

    }
}


//

export type ActionsForgotType =
    | ReturnType<typeof setRecoverEmailAC>

