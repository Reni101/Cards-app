import {AppThunk} from "../../../Redux/Store";
import {profilePageAPI} from "../ProfileAPI/profileAPI";
import axios, {AxiosError} from "axios";


const initialState = {
    profileName: "Maxim"
}

type InitialStateType = typeof initialState

export const ProfilePageReducer = (state: InitialStateType = initialState, action: ActionsProfileType): InitialStateType => {
    switch (action.type) {
        case 'SET_PROFILE_NAME':
            return {...state, profileName: action.name}
        default:
            return state
    }
}
//=============================AC======================================
export const editProfileNameAC = (name: string) => ({
    type: 'SET_PROFILE_NAME',
    name
} as const)


//==============================TC============================

export const editProfileNameTC = (newName: string): AppThunk => async dispatch => {
    try {
        const res = await profilePageAPI.editProfileName(newName)
        dispatch(editProfileNameAC(res.data.updatedUser.name))

    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
            // dispatch(setAppErrorAC(error)) диспатчим ошибку
        } else {
            //dispatch(setAppErrorAC(`Native error ${err.message}`))
        }
    }

}


//

export type ActionsProfileType =
    | ReturnType<typeof editProfileNameAC>

