import {registrationApi} from "./apiRegistration";
import {Dispatch} from "redux";
import {AppThunk} from "../../Redux/Store";
import axios, {AxiosError} from "axios";
import {setErrorApp, setStatusApp} from "../../AppReducer";

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
    dispatch(setStatusApp('loading'))
    try {
        const response = await registrationApi.registration(data)
        dispatch(setRegisrationAC(response.data.addedUser))
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
            dispatch(setErrorApp(error))
        } else {
            dispatch(setErrorApp(`Native error ${err.message}`))
        }
    } finally {
        dispatch(setStatusApp('idle'))
    }


}

