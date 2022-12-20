import {AppThunk} from './Redux/Store';
import {Dispatch} from 'redux';
import {getAuthTC} from './pages/login/loginReducer/LoginReducer';
import {AxiosError} from 'axios';
import {handleError} from './common/ErrorUtils/errorFunck';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


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

const slice = createSlice({
    name: 'app',
    initialState: InitialState,
    reducers: {
        setErrorApp(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setStatusApp(state,action:PayloadAction<{status:requestStatusType}>) {
            state.status = action.payload.status
        },
        initializedAppAC(status,action:PayloadAction){
            status.initialized = false
        }
    }
})
export const AppReducer = slice.reducer
export const {setErrorApp,setStatusApp,initializedAppAC} = slice.actions

export type appReducersType = setErrorType | setStatusType | initializedAppType
type setErrorType = ReturnType<typeof setErrorApp>
export type setStatusType = ReturnType<typeof setStatusApp>
export type initializedAppType = ReturnType<typeof initializedAppAC>


export const initializedAppTC = (): AppThunk =>
    async (dispatch: Dispatch) => {
        const promise = await dispatch(getAuthTC() as any)
        await Promise.all([promise])
        try {
            dispatch(initializedAppAC())
            dispatch(setErrorApp({error:null}))
        } catch (e) {
            const err = e as Error | AxiosError
            handleError(err, dispatch)
        }

    }