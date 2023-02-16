import {AppDispatch} from './Store';
import {loginApi, LoginType} from '../api/Login-api';
import {AxiosError} from 'axios';
import {setStatusApp} from './App-reducer';
import {setProfileDataAC} from "./Profile-reducer";
import {handleError} from "../common/errorUtils/errorFunction";
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
        name: 'login',
        initialState: initialState,
        reducers: {
            setLoginAC(state, action: PayloadAction<{ data: LoginType, id: string, isAuth: boolean }>) {
                state.id = action.payload.id
                state.isAuth = action.payload.isAuth
                state.email = action.payload.data.email
                state.rememberMe = action.payload.data.rememberMe
                state.password = action.payload.data.password
            },
            getAuthAC(state, action: PayloadAction<{ id: string, name: string, email: string, isAuth: boolean, token: string }>) {
                state.id = action.payload.id
                state.isAuth = action.payload.isAuth
                state.email = action.payload.email
                state.name = action.payload.name
                state.token = action.payload.token
            }
        }
    }
)
export const loginReducer = slice.reducer
export const {setLoginAC, getAuthAC} = slice.actions


export const getAuthTC = () => async (dispatch: AppDispatch) => {
    try {
        const res = await loginApi.authUser();
        const {_id, email, name, token} = res
        dispatch(getAuthAC({id: _id, name, email, isAuth: true, token}))
        dispatch(setProfileDataAC({data: res}))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    }
}

export const singInTC = (data: LoginType) => async (dispatch: AppDispatch) => {
    dispatch(setStatusApp({status: 'loading'}))
    try {
        const res = await loginApi.login(data)
        dispatch(setLoginAC({data, id: res._id, isAuth: true}))
        dispatch(setStatusApp({status: 'succeeded'}))
        dispatch(setProfileDataAC({data: res})) // добавляет в профаил имя, email, avatar, id
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    }
}

export const singOutTC = () => async (dispatch: AppDispatch) => {
    dispatch(setStatusApp({status: 'loading'}))
    try {
        await loginApi.logout()
        dispatch(getAuthAC({id: '', name: '', email: '', isAuth: false, token: ''}))
        dispatch(setStatusApp({status: 'succeeded'}))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    }
}
