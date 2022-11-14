import {AppThunk} from "../../../Redux/Store";
import {loginApi, LoginType} from '../loginAPI/LoginApi';
import {Dispatch} from 'redux';
import axios, {AxiosError} from 'axios';
import {setErrorApp, setStatusApp} from '../../../AppReducer';


export type initialStateType = LoginType & forLoginUserInfo
type forLoginUserInfo = {
    id : string
    isAuth:boolean
}

const initialState: initialStateType = {
    id:'',
    isAuth:false,
    email:'',
    password:'',
    rememberMe:false,
}

export const LoginReducer = (state:initialStateType = initialState,action:ActionsLoginType):initialStateType => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {...state,...action.payload.data,id:action.payload.id,isAuth:action.payload.isAuth}
        default:
            return state
    }
}
export type ActionsLoginType = LoginACType
export type LoginACType = ReturnType<typeof LoginAC>
export const LoginAC = (data:LoginType,id:string,isAuth:boolean) => {
 return {
     type:'LOGIN_USER',
     payload:{
         data,
         id,
         isAuth
     }
 } as const
}

export const SingInTC = (data:LoginType):AppThunk =>
    async(dispatch:Dispatch) => {
        dispatch(setStatusApp('loading'))
        try{
            const res = await loginApi.login(data)
            dispatch(LoginAC(data,res.data._id,true))
            dispatch(setStatusApp('succeeded'))
        }
        catch (e) {
            const err = e as Error | AxiosError
            if (axios.isAxiosError(err)) {
                const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
                console.log(error)
                 dispatch(setErrorApp(error))
            } else {
                dispatch(setErrorApp(`Native error ${err.message}`))

            }
            dispatch(setStatusApp('failed'))
        }
    }
