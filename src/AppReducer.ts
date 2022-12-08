import {AppThunk} from './Redux/Store';
import {Dispatch} from 'redux';
import {getAuthTC} from './pages/login/loginReducer/LoginReducer';
import {AxiosError} from 'axios';
import {handleError} from "./common/ErrorUtils/errorFunck";


export type requestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type appInitialStateType = {
    status: requestStatusType
    error: string | null
    initialized: boolean
}
const InitialState: appInitialStateType = {
    status: 'idle',
    error: null,
    initialized: true
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
            return {...state, initialized: false}
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
        try {
            dispatch(initializedAppAC())
            dispatch(setErrorApp(null))
        } catch (e) {
            const err = e as Error | AxiosError
            handleError(err, dispatch)
        }

    }