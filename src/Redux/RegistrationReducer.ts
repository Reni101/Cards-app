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
    }
}

type InitialStateType = typeof initialState

export const RegistrationReducer = (state: InitialStateType = initialState, action: RegistrationActionType): InitialStateType => {
    switch (action.type) {
        case 'registration/SET-REGISTRATION':
            debugger
            return {...state, isSuccessfulRegistration: true, addedUser: action.data}
        default:
            return state
    }
}


export type RegistrationActionType = SetRegisrationACType
export type SetRegisrationACType = ReturnType<typeof setRegisrationAC>

const setRegisrationAC = (data: ResponseRegistrationType) => ({type: 'registration/SET-REGISTRATION', data} as const)

type ThunkDispatch = Dispatch<SetRegisrationACType>

export const registrationTC = (data: any): AppThunk => (dispatch) => {
    registrationApi.registration(data)
        .then((res) => {
            debugger
            dispatch(setRegisrationAC(res.data.addedUser))
        })
        .catch((er) => {
            debugger
        })

}

