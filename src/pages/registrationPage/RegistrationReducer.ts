import {registrationApi} from "./apiRegistration";
import {AppDispatch} from "../../Redux/Store";
import {AxiosError} from "axios";
import {setStatusApp} from "../../AppReducer";
import {handleError} from "../../common/ErrorUtils/errorFunck";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'RegistrationReducer',
    initialState: { isSuccessfulRegistration: false,
        error: null as string | null},
    reducers: {
        setRegistrationAC(state, action: PayloadAction<{ data: boolean }>) {
            state.isSuccessfulRegistration = action.payload.data
        },
        setErrorApiRegistration(state, action: PayloadAction<{ error: string }>) {
            state.error = action.payload.error
        },
    }
})


export const registrationReducer = slice.reducer
export const {setRegistrationAC, setErrorApiRegistration} = slice.actions


export const registrationTC = (data: { email: string, password: string }) => async (dispatch: AppDispatch) => {
    dispatch(setStatusApp({status: 'loading'}))
    try {
        const response = await registrationApi.registration(data)
        dispatch(setRegistrationAC(response.data.addedUser))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    } finally {
        dispatch(setStatusApp({status: 'idle'}))
    }


}

