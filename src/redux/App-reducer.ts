import {AppDispatch} from './Store';
import {getAuthTC} from './Login-reducer';
import {AxiosError} from 'axios';
import {handleError} from '../common/errorUtils/errorFunction';
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
        setStatusApp(state, action: PayloadAction<{ status: requestStatusType }>) {
            state.status = action.payload.status
        },
        initializedAppAC(status) {
            status.initialized = false
        }
    }
})
export const appReducer = slice.reducer
export const {setErrorApp, setStatusApp, initializedAppAC} = slice.actions


export const initializedAppTC = () =>
    async (dispatch: AppDispatch) => {
        const promise = await dispatch(getAuthTC())
        await Promise.all([promise])
        try {
            dispatch(initializedAppAC())
            dispatch(setErrorApp({error: null}))
        } catch (e) {
            const err = e as Error | AxiosError
            handleError(err, dispatch)
        }

    }