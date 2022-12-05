import {AppThunk} from "../../Redux/Store";
import {profileEditType, profilePageAPI, updatedUser} from "./profileAPI";
import {AxiosError} from "axios";
import {setStatusApp} from "../../AppReducer";
import {handleError} from "../../common/ErrorUtils/errorFunck";


const initialState = {
    user_id: "",
    email: null as string | null,
    name: null as string | null,
    publicCardPacksCount: null as number | null,
    avatar: null as string | null
}

type InitialStateType = typeof initialState

export const ProfilePageReducer = (state: InitialStateType = initialState, action: ActionsProfileType): InitialStateType => {
    switch (action.type) {
        case "PROFILE_PAGE_SET_PROFILE_DATA":
            return {
                ...state,
                name: action.data.name,
                email: action.data.email,
                avatar: action.data.avatar,
                user_id: action.data._id
            }
        case 'PROFILE_PAGE_CHANGE_PROFILE_NAME':
            return {...state, name: action.payload.name, avatar: action.payload.avatar}
        default:
            return state
    }
}
//=============================AC======================================
export const editProfileNameAvatarAC = (name: string, avatar: string) => ({
    type: 'PROFILE_PAGE_CHANGE_PROFILE_NAME',
    payload: {
        name,
        avatar
    }
} as const)
export const setProfileDataAC = (data: updatedUser) => ({
    type: 'PROFILE_PAGE_SET_PROFILE_DATA',
    data
} as const)


//==============================TC============================

export const editProfileNameAvatarTC = ({name, avatar}: profileEditType): AppThunk => async dispatch => {
    dispatch(setStatusApp('loading'))
    try {
        const res = await profilePageAPI.editProfileName({name, avatar})
        dispatch(editProfileNameAvatarAC(res.data.updatedUser.name, res.data.updatedUser.avatar))
        dispatch(setStatusApp('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    }
}


export type ActionsProfileType =
    | ReturnType<typeof editProfileNameAvatarAC>
    | ReturnType<typeof setProfileDataAC>
