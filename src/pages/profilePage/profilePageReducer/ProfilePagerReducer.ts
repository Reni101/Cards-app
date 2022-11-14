import {AppThunk} from "../../../Redux/Store";
import {profilePageAPI} from "../ProfileAPI/profileAPI";
import axios, {AxiosError} from "axios";


const initialState = {
    _id: "6370a0a88059f7000461631d",
    email: "maximor-2008@tut.by",
    rememberMe: true,
    isAdmin: false,
    name: "Maxim",
    verified: false,
    publicCardPacksCount: 0,
    created: "2022-11-13T07:45:44.474Z",
    updated: "2022-11-13T07:45:44.474Z",
    __v: 0,
    token: "ded51a60-63e2-11ed-8d2b-6d5137eb3e0c",
    tokenDeathTime: 1669010957062,
    avatar: null
}

type InitialStateType = typeof initialState

export const ProfilePageReducer = (state: InitialStateType = initialState, action: ActionsProfileType): InitialStateType => {
    switch (action.type) {
        case 'PROFILE_PAGE_CHANGE_PROFILE_NAME':
            return {...state, name: action.name,}
        default:
            return state
    }
}
//=============================AC======================================
export const editProfileNameAC = (name: string) => ({
    type: 'PROFILE_PAGE_CHANGE_PROFILE_NAME',
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

export type ProfileType = {
    _id: string,
    email: string,
    rememberMe: boolean,
    isAdmin: boolean,
    name: string,
    verified: boolean,
    publicCardPacksCount: number,
    created: string,
    updated: string,
    __v: number,
    token: string,
    tokenDeathTime: number,
    avatar: null | string
}