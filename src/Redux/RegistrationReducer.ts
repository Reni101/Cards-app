import {registrationApi} from "../pages/registrationPage/apiRegistration";
import {Dispatch} from "redux";
import {AppThunk} from "./Store";

const initialState = {}

type InitialStateType = typeof initialState

export const RegistrationReducer = (state: InitialStateType = initialState, action: RegistrationActionType): InitialStateType => {
    switch (action.type) {
        case 'registration/SET-REGISTRATION':
            return {...state}
        default:
            return state
    }
}


export type RegistrationActionType = SetRegisrationACType
export type SetRegisrationACType = ReturnType<typeof setRegisrationAC>

const setRegisrationAC = () => ({type: 'registration/SET-REGISTRATION'} as const)

type ThunkDispatch = Dispatch<SetRegisrationACType>

export const registrationTC = (data: any): AppThunk => (dispatch) => {
    registrationApi.registration(data)
        .then((res) => {

        })
        .catch((er) => {

        })

}

