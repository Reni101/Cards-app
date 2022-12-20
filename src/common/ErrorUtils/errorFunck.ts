import axios, {AxiosError} from "axios";
import {setErrorApp} from "../../AppReducer";
import {Dispatch} from "redux";

export const handleError = (err: Error | AxiosError, dispatch:Dispatch) => {
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
        dispatch(setErrorApp({error}))
    } else {
        dispatch(setErrorApp({error:`Native error ${err.message}`
    }))
    }
}