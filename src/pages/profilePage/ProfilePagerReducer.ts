import {AppThunk} from "../../Redux/Store";
import {profilePageAPI, updatedUser} from "./profileAPI";
import axios, {AxiosError} from "axios";


const initialState = {
    email: null as string | null,
    name: null as string | null,
    publicCardPacksCount: null as number | null,
    avatar: null as string | null
}

type InitialStateType = typeof initialState

export const ProfilePageReducer = (state: InitialStateType = initialState, action: ActionsProfileType): InitialStateType => {
    switch (action.type) {
        case "PROFILE_PAGE_SET_PROFILE_DATA":
            return {...state,name:action.data.name,email: action.data.email,avatar: action.data.avatar}
        case 'PROFILE_PAGE_CHANGE_PROFILE_NAME':
            return {...state, name: action.name}
        default:
            return state
    }
}
//=============================AC======================================
export const editProfileNameAC = (name: string) => ({
    type: 'PROFILE_PAGE_CHANGE_PROFILE_NAME',
    name
} as const)
export const setProfileDataAC = (data: updatedUser) => ({
    type: 'PROFILE_PAGE_SET_PROFILE_DATA',
    data
} as const)


//==============================TC============================

export const editProfileNameTC = (newName: string | null): AppThunk => async dispatch => {
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
    | ReturnType<typeof setProfileDataAC>
