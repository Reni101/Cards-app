import {AppThunk} from '../../Redux/Store';
import {setStatusApp} from '../../AppReducer';
import {AxiosError} from 'axios';
import {packsAPI, queryModelType, RequestAddPackType, RequestUpdatePackType, ResponsePacksType} from './PacksAPI';
import {handleError} from '../../common/ErrorUtils/errorFunck';
import {setPackNameForCardAC, setPacksIdAC} from '../cardsPage/CardsReducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ActionsPacksType =
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof changePageAC>
    | ReturnType<typeof changeMinAC>
    | ReturnType<typeof changeMaxAC>
    | ReturnType<typeof changePageCountAC>
    | ReturnType<typeof changeSortPacksAC>
    | ReturnType<typeof sortPacksNameAC>
    | ReturnType<typeof changeShowMyPacksAC>

const MAX_COUNT_CARDS = 110

export type PacksType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    grade: number
    shots: number
    deckCover: string
    cardsCount: number
    created: string
    updated: string
}

export type InitialStateType = {
    cardPacks: Array<PacksType>
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    page: number | null
    pageCount: number
    min: number | null
    max: number | null
    sortPacks: string | null
    packName: string | null
    user_id: string | null
}

const initialState: InitialStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    page: 1,
    pageCount: 5,
    min: 0,
    max: MAX_COUNT_CARDS,
    sortPacks: '',
    packName: null,
    user_id: '',
}



export const slice = createSlice({
    name: 'packs',
    initialState: initialState,
    reducers: {
        setPacksAC(state, action: PayloadAction<{ resObj: ResponsePacksType }>) {
            state.cardPacks = action.payload.resObj.cardPacks
            state.page = action.payload.resObj.page
            state.pageCount = action.payload.resObj.pageCount
            state.cardPacksTotalCount = action.payload.resObj.cardPacksTotalCount
            state.minCardsCount = action.payload.resObj.minCardsCount
            state.maxCardsCount = action.payload.resObj.maxCardsCount
        },
        changePageAC(state, action: PayloadAction<{ page: number }>) {
            state.page = action.payload.page
        },
        changeMinAC(state, action: PayloadAction<{ min: number }>) {
            state.min = action.payload.min
        },
        changeMaxAC(state, action: PayloadAction<{ max: number }>) {
            state.max = action.payload.max
        },
        changePageCountAC(state, action: PayloadAction<{ pageCount: number }>) {
            state.pageCount = action.payload.pageCount
        },
        changeSortPacksAC(state, action: PayloadAction<{ sortPacks: string }>) {
            state.sortPacks = action.payload.sortPacks
        },
        sortPacksNameAC(state, action: PayloadAction<{ packName: string }>) {
            state.packName = action.payload.packName
        },
        changeShowMyPacksAC(state,action:PayloadAction<{user_id:string}>){
            state.user_id = action.payload.user_id
        }

    }
})
export const PacksReducer = slice.reducer
export const {
    setPacksAC, changePageAC, changeMinAC, changeMaxAC,
    changePageCountAC, changeSortPacksAC, sortPacksNameAC,changeShowMyPacksAC
} = slice.actions


//==============================TC============================

export const SetCardsPackTC = (QuerySearchParams: queryModelType): AppThunk =>
    async (dispatch, getState) => {
        dispatch(setStatusApp({status: 'loading'}))
        try {
            let {packName, user_id, min, max} = QuerySearchParams
            let {page, pageCount, sortPacks, maxCardsCount} = getState().Packs
            if (page === 1) page = null
            if (max === 0) max = maxCardsCount
            if (sortPacks === '') sortPacks = null
            if (packName === '') packName = null
            if (user_id === '') user_id = null

            const res = await packsAPI.getPacks({min, max, page, pageCount, sortPacks, packName, user_id})
            dispatch(setPacksAC({resObj: res.data}))
            dispatch(setStatusApp({status: 'succeeded'}))
        } catch
            (e) {
            const err = e as Error | AxiosError
            handleError(err, dispatch)
        }
    }

export const AddPackTC = (cardsPack: RequestAddPackType, searchQueryUserId?: string):AppThunk => async (dispatch) => {
    dispatch(setStatusApp({status: 'loading'}))
    try {
        await packsAPI.addPack(cardsPack)
        await dispatch(SetCardsPackTC({user_id: searchQueryUserId}))
        dispatch(setStatusApp({status: 'succeeded'}))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    } finally {
        dispatch(setStatusApp({status: 'idle'}))
    }
}


export const UpdatePackTC = (cardsPack: RequestUpdatePackType, searchQueryUserId?: string):AppThunk => async (dispatch) => {
    dispatch(setStatusApp({status: 'loading'}))
    try {
        await packsAPI.updatePack(cardsPack)
        dispatch(SetCardsPackTC({user_id: searchQueryUserId}))
        dispatch(setPackNameForCardAC({newPackName:cardsPack.name!}))
        dispatch(setStatusApp({status: 'succeeded'}))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    } finally {
        dispatch(setStatusApp({status: 'idle'}))
    }
}


export const DeletePackTC = (idPack: string, searchQueryUserId?: string):AppThunk => async (dispatch) => {
    dispatch(setStatusApp({status: 'loading'}))
    try {
        await packsAPI.deletePack(idPack)
        dispatch(SetCardsPackTC({user_id: searchQueryUserId}))
        dispatch(setPacksIdAC({packsId:''}))
        dispatch(setStatusApp({status: 'succeeded'}))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    } finally {
        dispatch(setStatusApp({status: 'idle'}))
    }
}

