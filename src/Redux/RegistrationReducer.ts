import {registrationApi, ResponseRegistrationType} from "../pages/registrationPage/apiRegistration";
import {Dispatch} from "redux";
import {AppThunk} from "./Store";

const initialState = {
    isSuccessfulRegistration: false,
    addedUser: {
        created: '',
        email: '',
        isAdmin: false,
        name: '',
        publicCardPacksCount: null as null | number,
        rememberMe: false,
        updated: '',
        verified: false,
        __v: null as null | number,
        _id: ''
    },
    error: null as string | null
}

type InitialStateType = typeof initialState

export const RegistrationReducer = (state: InitialStateType = initialState, action: RegistrationActionType): InitialStateType => {
    switch (action.type) {
        case 'registration/SET-REGISTRATION':
            return {...state, isSuccessfulRegistration: true, addedUser: action.data}
        case "registration/SET-ERROR-API":
            return {...state, error: action.error}
        default:
            return state
    }
}


export type RegistrationActionType = SetRegisrationACType | SetErrorApiRegistrationType

export type SetRegisrationACType = ReturnType<typeof setRegisrationAC>
const setRegisrationAC = (data: ResponseRegistrationType) => ({type: 'registration/SET-REGISTRATION', data} as const)

export type SetErrorApiRegistrationType = ReturnType<typeof setErrorApiRegistration>
const setErrorApiRegistration = (error: string) => ({type: 'registration/SET-ERROR-API', error} as const)

type ThunkDispatch = Dispatch<SetRegisrationACType>

export const registrationTC = (data: any): AppThunk => (dispatch) => {
    registrationApi.registration(data)
        .then((res) => {
            debugger
            dispatch(setRegisrationAC(res.data.addedUser))
        })
        .catch((er) => {
            debugger
            let error = er.response ? er.response.data.error : er.message
            dispatch(setErrorApiRegistration(error))
        })

}

