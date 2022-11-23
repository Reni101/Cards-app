import {AppThunk} from "../../../Redux/Store";
import {setErrorApp, setStatusApp} from "../../../AppReducer";
import {PacksAPI, RequestAddPackType, RequestUpdatePackType} from "./PacksAPI";
import axios, {AxiosError} from "axios";

const initialState = {}

type InitialStateType = typeof initialState

export const PacksReducer = (state: InitialStateType = initialState, action: PacksActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}


export const AddPackTC = (cardsPack: RequestAddPackType): AppThunk => async (dispatch) => {
    dispatch(setStatusApp('loading'))
    try {
        await PacksAPI.addPack(cardsPack)
        // make a request for packs
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
            dispatch(setErrorApp(error))
        } else {
            dispatch(setErrorApp(`Native error ${err.message}`))
        }
    } finally {
        dispatch(setStatusApp('idle'))
    }
}


export const UpdatePackTC = (cardsPack: RequestUpdatePackType): AppThunk => async (dispatch) => {
    dispatch(setStatusApp('loading'))
    try {
        await PacksAPI.updatePack(cardsPack)
        // make a request for packs
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
            dispatch(setErrorApp(error))
        } else {
            dispatch(setErrorApp(`Native error ${err.message}`))
        }
    } finally {
        dispatch(setStatusApp('idle'))
    }
}


export const DeletePackTC = (idPack: string): AppThunk => async (dispatch) => {
    dispatch(setStatusApp('loading'))
    try {
        await PacksAPI.deletePack(idPack)
        // make a request for packs
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
            dispatch(setErrorApp(error))
        } else {
            dispatch(setErrorApp(`Native error ${err.message}`))
        }
    } finally {
        dispatch(setStatusApp('idle'))
    }
}

export type PacksActionsType = {
    type: string
}


