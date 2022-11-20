import {AppThunk} from "../../Redux/Store";
import {profilePageAPI, updatedUser} from "./profileAPI";
import axios, {AxiosError} from "axios";
import {setErrorApp, setStatusApp} from "../../AppReducer";


const initialState = {
    user_id:null as string | null,
    email: null as string | null,
    name: null as string | null,
    publicCardPacksCount: null as number | null,
    avatar: null as string | null
}

type InitialStateType = typeof initialState

export const ProfilePageReducer = (state: InitialStateType = initialState, action: ActionsProfileType): InitialStateType => {
    switch (action.type) {
        case "PROFILE_PAGE_SET_PROFILE_DATA":
            return {...state,name:action.data.name,email: action.data.email,avatar: action.data.avatar,user_id: action.data._id}
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
    dispatch(setStatusApp('loading'))
    try {
        const res = await profilePageAPI.editProfileName(newName)
        dispatch(editProfileNameAC(res.data.updatedUser.name))
        dispatch(setStatusApp('succeeded'))
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

export type ActionsProfileType =
    | ReturnType<typeof editProfileNameAC>
    | ReturnType<typeof setProfileDataAC>
