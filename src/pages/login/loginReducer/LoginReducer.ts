import {AppThunk} from '../../../Redux/Store';
import {loginApi, LoginType} from '../loginAPI/LoginApi';
import axios, {AxiosError} from 'axios';
import {setStatusApp} from '../../../AppReducer';



import {setProfileDataAC} from "../../profilePage/ProfilePagerReducer";
import {handleError} from "../../../common/ErrorUtils/errorFunck";


export type initialStateType = LoginType & forLoginUserInfo
type forLoginUserInfo = {
    id: string
    isAuth: boolean
    name: string
    token: string
}

const initialState: initialStateType = {
    id: '',
    name: '',
    token: '',
    isAuth: false,
    email: '',
    password: '',
    rememberMe: false,
}

export const LoginReducer = (state: initialStateType = initialState, action: ActionsLoginType): initialStateType => {
    switch (action.type) {
        case 'LOGIN_USER': {
            return {...state, ...action.payload.data, id: action.payload.id, isAuth: action.payload.isAuth}
        }
        case 'AUTH_USER': {
            return {
                ...state,
                id: action.payload.id,
                isAuth: action.payload.isAuth,
                name: action.payload.name,
                email: action.payload.email,
                token: action.payload.token
            }
        }
        default:
            return state
    }
}
export type ActionsLoginType = LoginACType | getAuthACType
export type LoginACType = ReturnType<typeof setLoginAC>
export const setLoginAC = (data: LoginType, id: string, isAuth: boolean) => {
    return {
        type: 'LOGIN_USER',
        payload: {
            data,
            id,
            isAuth
        }
    } as const
}
export type getAuthACType = ReturnType<typeof getAuthAC>
export const getAuthAC = (id: string, name: string, email: string, isAuth: boolean, token: string) => {
    return {
        type: 'AUTH_USER',
        payload: {
            id,
            name,
            email,
            isAuth,
            token
        }
    } as const
}

export const getAuthTC = (): AppThunk =>
    async (dispatch) => {
        try {
            let res = await loginApi.authUser();
            let {_id, email, name, token} = res.data
            dispatch(getAuthAC(_id, name, email, true, token))
            dispatch(setProfileDataAC(res.data)) // добавляет в профаил имя, email, avatar id
        } catch (e) {
            const err = e as Error | AxiosError
            handleError(err,dispatch)
        }

    }

export const SingInTC = (data: LoginType): AppThunk =>
    async (dispatch) => {
        dispatch(setStatusApp('loading'))
        try {
            const res = await loginApi.login(data)
            dispatch(setLoginAC(data, res.data._id, true))
            dispatch(setStatusApp('succeeded'))
            dispatch(setProfileDataAC(res.data)) // добавляет в профаил имя, email, avatar, id
        } catch (e) {
            const err = e as Error | AxiosError
            handleError(err,dispatch)
        }
    }

export const SingOutTC = (): AppThunk =>
    async (dispatch) => {
        dispatch(setStatusApp('loading'))
        try {
            await loginApi.logout()
            dispatch(getAuthAC('', '', '', false, ''))
            dispatch(setStatusApp('succeeded'))
        } catch (e) {
            const err = e as Error | AxiosError
            handleError(err,dispatch)
        }
    }