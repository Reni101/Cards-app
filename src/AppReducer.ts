import {AppThunk} from './Redux/Store';
import {Dispatch} from 'redux';
import {getAuthTC} from './pages/login/loginReducer/LoginReducer';
import axios, {AxiosError} from 'axios';


export type requestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type appInitialStateType = {
    status: requestStatusType
    error: string | null
    initialized: boolean
}
const InitialState: appInitialStateType = {
    status: 'idle',
    error: null,
    initialized: false
}
export const AppReducer = (state: appInitialStateType = InitialState, action: appReducersType): appInitialStateType => {

    switch (action.type) {
        case 'APP/SET_ERROR': {
            return {...state, error: action.error}
        }
        case 'APP/SET_STATUS' : {
            return {...state, status: action.status}
        }
        case 'APP/INITIALIZED' : {
            return {...state,initialized:true}
        }
        default:
            return {...state}
    }
}

export type appReducersType = setErrorType | setStatusType | initializedAppType
type setErrorType = ReturnType<typeof setErrorApp>
export const setErrorApp = (error: string | null) => {
    return {
        type: 'APP/SET_ERROR',
        error
    } as const
}
export type setStatusType = ReturnType<typeof setStatusApp>
export const setStatusApp = (status: requestStatusType) => {
    return {
        type: 'APP/SET_STATUS',
        status
    } as const
}
export type initializedAppType = ReturnType<typeof initializedAppAC>
export const initializedAppAC = () => {
    return {
        type: 'APP/INITIALIZED',
    } as const
}

export const initializedAppTC = (): AppThunk =>
    async (dispatch: Dispatch) => {
        const promise = await dispatch(getAuthTC() as any)
        await Promise.all([promise])
        try{
            dispatch(initializedAppAC())
        }
        catch(e){
            const err = e as Error | AxiosError
            if (axios.isAxiosError(err)) {
                const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
                console.log(err)
                dispatch(setErrorApp(error))
            } else {
                dispatch(setErrorApp(`Native error ${err.message}`))

            }
        }

    }