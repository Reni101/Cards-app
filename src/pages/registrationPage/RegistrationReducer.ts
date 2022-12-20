import {registrationApi} from "./apiRegistration";
import {AppThunk} from "../../Redux/Store";
import  {AxiosError} from "axios";
import { setStatusApp} from "../../AppReducer";
import {handleError} from "../../common/ErrorUtils/errorFunck";

const initialState = {
    isSuccessfulRegistration: false,
    error: null as string | null
}

type InitialStateType = typeof initialState

export const RegistrationReducer = (state: InitialStateType = initialState, action: RegistrationActionType): InitialStateType => {
    switch (action.type) {
        case 'registration/SET-REGISTRATION':
            return {...state, isSuccessfulRegistration: action.data}
        case "registration/SET-ERROR-API":
            return {...state, error: action.error}
        default:
            return state
    }
}


export type RegistrationActionType = SetRegisrationACType | SetErrorApiRegistrationType

export type SetRegisrationACType = ReturnType<typeof setRegisrationAC>
export const setRegisrationAC = (data: boolean) => ({type: 'registration/SET-REGISTRATION', data} as const)

export type SetErrorApiRegistrationType = ReturnType<typeof setErrorApiRegistration>
const setErrorApiRegistration = (error: string) => ({type: 'registration/SET-ERROR-API', error} as const)


export const registrationTC = (data: { email: string, password: string }): AppThunk => async (dispatch) => {
    dispatch(setStatusApp({status:'loading'}))
    try {
        const response = await registrationApi.registration(data)
        dispatch(setRegisrationAC(response.data.addedUser))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err,dispatch)
    } finally {
        dispatch(setStatusApp({status:'idle'}))
    }


}

