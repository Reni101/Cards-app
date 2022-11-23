import {AppThunk} from "../../../Redux/Store";
import {setErrorApp, setStatusApp} from "../../../AppReducer";
import {PacksAPI} from "../Pack/PacksAPI";
import axios, {AxiosError} from "axios";
import {CardsAPI, RequestAddCardType, RequestUpdateCardType} from "./CardsAPI";

const initialState = {}

type InitialStateType = typeof initialState

export const CardsReducer = (state: InitialStateType = initialState, action: PacksActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}


export const AddCardTC = (card: RequestAddCardType): AppThunk => async (dispatch) => {
    dispatch(setStatusApp('loading'))
    try {
        await CardsAPI.addCard(card)
        // make a request for cards
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


export const UpdateCardTC = (card: RequestUpdateCardType): AppThunk => async (dispatch) => {
    dispatch(setStatusApp('loading'))
    try {
        await CardsAPI.updateCard(card)
        // make a request for cards
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


export const DeleteCardTC = (idCard: string): AppThunk => async (dispatch) => {
    dispatch(setStatusApp('loading'))
    try {
        await CardsAPI.deleteCard(idCard)
        // make a request for cardss
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


