import {registrationApi} from "./apiRegistration";
import {AppThunk} from "../../Redux/Store";
import {AxiosError} from "axios";
import {setStatusApp} from "../../AppReducer";
import {handleError} from "../../common/ErrorUtils/errorFunck";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isSuccessfulRegistration: false,
    error: null as string | null
}

type InitialStateType = typeof initialState

const slice = createSlice({
    name: 'RegistrationReducer',
    initialState: initialState,
    reducers: {
        setRegisrationAC(state, action: PayloadAction<{ data: boolean }>) {
            state.isSuccessfulRegistration = action.payload.data
        },
        setErrorApiRegistration(state, action: PayloadAction<{ error: string }>) {
            state.error = action.payload.error
        },
    }
})


export const RegistrationReducer = slice.reducer
export const {setRegisrationAC, setErrorApiRegistration} = slice.actions

export type RegistrationActionType =
    | ReturnType<typeof setRegisrationAC>
    | ReturnType<typeof setErrorApiRegistration>


export const registrationTC = (data: { email: string, password: string }): AppThunk => async (dispatch) => {
    dispatch(setStatusApp({status: 'loading'}))
    try {
        const response = await registrationApi.registration(data)
        dispatch(setRegisrationAC(response.data.addedUser))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    } finally {
        dispatch(setStatusApp({status: 'idle'}))
    }


}

