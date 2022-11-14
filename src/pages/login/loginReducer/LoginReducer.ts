import {AppThunk} from "../../../Redux/Store";
import {loginApi, LoginType} from '../loginAPI/LoginApi';
import {Dispatch} from 'redux';
import {AxiosError} from 'axios';


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
        //dispatch(setStatusApp({status:'loading'}))
        try{
            const res = await loginApi.login(data)
            dispatch(LoginAC(data,res.data._id,true))
        }
        catch (e) {
            const err = e as Error | AxiosError
        }
    }
