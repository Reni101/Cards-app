import {AppThunk} from '../../../Redux/Store';
import {loginApi, LoginType} from '../loginAPI/LoginApi';
import {AxiosError} from 'axios';
import {setStatusApp} from '../../../AppReducer';


import {setProfileDataAC} from "../../profilePage/ProfilePagerReducer";
import {handleError} from "../../../common/ErrorUtils/errorFunck";
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


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

const slice = createSlice(
    {
        name:'login',
        initialState:initialState,
        reducers:{
            setLoginAC(state,action:PayloadAction<{data: LoginType, id: string, isAuth: boolean}>){
                state.id = action.payload.id
                state.isAuth = action.payload.isAuth
                state.email = action.payload.data.email
                state.rememberMe = action.payload.data.rememberMe
                state.password = action.payload.data.password
            },
            getAuthAC(state,action:PayloadAction<{id: string, name: string, email: string, isAuth: boolean, token: string}>){
                state.id = action.payload.id
                state.isAuth = action.payload.isAuth
                state.email = action.payload.email
                state.name = action.payload.name
                state.token = action.payload.token
            }
        }
    }
)
export const LoginReducer = slice.reducer
export const {setLoginAC,getAuthAC} = slice.actions

export type ActionsLoginType = LoginACType | getAuthACType
export type LoginACType = ReturnType<typeof setLoginAC>
export type getAuthACType = ReturnType<typeof getAuthAC>


export const getAuthTC = ():AppThunk =>
    async (dispatch) => {
        try {
            let res = await loginApi.authUser();
            let {_id, email, name, token} = res
            dispatch(getAuthAC({id:_id, name, email, isAuth:true, token}))
            dispatch(setProfileDataAC({data: res})) // добавляет в профаил имя, email, avatar id
        } catch (e) {
            const err = e as Error | AxiosError
            handleError(err, dispatch)
        }
    }

export const SingInTC = (data: LoginType):AppThunk =>
    async (dispatch) => {
        dispatch(setStatusApp({status:'loading'}))
        try {
            const res = await loginApi.login(data)
            dispatch(setLoginAC({data, id:res.data._id, isAuth:true}))
            dispatch(setStatusApp({status:'succeeded'}))
            dispatch(setProfileDataAC({data: res.data})) // добавляет в профаил имя, email, avatar, id
        } catch (e) {
            const err = e as Error | AxiosError
            handleError(err, dispatch)
        }
    }

export const SingOutTC = (): AppThunk =>
    async (dispatch) => {
        dispatch(setStatusApp({status:'loading'}))
        try {
            await loginApi.logout()
            dispatch(getAuthAC({id:'', name:'', email:'', isAuth:false, token:''}))
            dispatch(setStatusApp({status:'succeeded'}))
        } catch (e) {
            const err = e as Error | AxiosError
            handleError(err, dispatch)
        }
    }
