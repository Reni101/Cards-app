import {registrationApi} from "../api/Registration-api";
import {AppDispatch} from "./Store";
import {AxiosError} from "axios";
import {setStatusApp} from "./App-reducer";
import {handleError} from "../common/errorUtils/errorFunction";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'RegistrationReducer',
    initialState: {
        isSuccessfulRegistration: false,
        error: null as string | null
    },
    reducers: {
        setRegistrationAC(state, action: PayloadAction<{ data: boolean }>) {
            state.isSuccessfulRegistration = action.payload.data
        },

    }
})


export const registrationReducer = slice.reducer
export const {setRegistrationAC} = slice.actions


export const registrationTC = (data: { email: string, password: string }) => async (dispatch: AppDispatch) => {
    dispatch(setStatusApp({status: 'loading'}))
    try {
        const res = await registrationApi.registration(data)
        dispatch(setRegistrationAC(res.addedUser))
        dispatch(setStatusApp({status: 'succeeded'}))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    }
}

