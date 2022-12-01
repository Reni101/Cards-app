import {AppThunk} from '../../Redux/Store';
import {setStatusApp} from '../../AppReducer';
import {AxiosError} from 'axios';
import {packsAPI, RequestAddPackType, RequestUpdatePackType, ResponsePacksType} from './PacksAPI';
import {handleError} from '../../common/ErrorUtils/errorFunck';
import {setCardsAC, setCardsTC, setPackNameForCardAC, setPacksIdAC} from '../cardsPage/CardsReducer';

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
    name: string,
    grade: number
    shots: number
    deckCover: string
    cardsCount: number,
    created: string,
    updated: string,
}


type InitialStateType = {
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


export const PacksReducer = (state: InitialStateType = initialState, action: ActionsPacksType): InitialStateType => {
    switch (action.type) {
        case 'PACKS/SET_PACKS':
            return {...state, ...action.payload}
        case 'PACKS/CHANGE_PAGE':
            return {...state, page: action.payload.page}
        case 'PACKS/CHANGE_MIN': {
            return {...state, min: action.payload.min}
        }
        case 'PACKS/CHANGE_MAX':
            return {...state, max: action.payload.max}
        case 'PACKS/CHANGE_PAGE_COUNT':
            return {...state, pageCount: action.payload.pageCount}
        case 'PACKS/CHANGE_SORT_PACK':
            return {...state, sortPacks: action.payload.sortPacks}
        case 'PACKS/SORT_PACKS_NAME':
            return {...state, packName: action.payload.packName}
        case 'PACKS/CHANGE_SHOW_MY_PACKS':
            return {...state, user_id: action.payload.user_id}
        default:
            return state
    }
}
//=============================AC======================================
export const setPacksAC = (resObj: ResponsePacksType) => ({
    type: 'PACKS/SET_PACKS',
    payload: resObj

} as const)

export const changePageAC = (page: number) => ({
    type: 'PACKS/CHANGE_PAGE',
    payload: {page}
} as const)

export const changeMinAC = (min: number) => ({
    type: 'PACKS/CHANGE_MIN',
    payload: {min}
} as const)

export const changeMaxAC = (max: number) => ({
    type: 'PACKS/CHANGE_MAX',
    payload: {max}
} as const)

export const changePageCountAC = (pageCount: number) => ({
    type: 'PACKS/CHANGE_PAGE_COUNT',
    payload: {pageCount}
} as const)

export const changeSortPacksAC = (sortPacks: string) => {
    return{

        type: 'PACKS/CHANGE_SORT_PACK',
        payload: {sortPacks}
    } as const
}

export const sortPacksNameAC = (packName: string) => ({
    type: 'PACKS/SORT_PACKS_NAME',
    payload: {packName}
} as const)

export const changeShowMyPacksAC = (user_id: string) => ({
    type: 'PACKS/CHANGE_SHOW_MY_PACKS',
    payload: {user_id}
} as const)


//==============================TC============================

export const SetCardsPackTC = (packsSearch?: string): AppThunk =>
    async (dispatch, getState) => {
        dispatch(setStatusApp('loading'))
        try {
            let {page, min, max, pageCount, sortPacks, packName, user_id} = getState().Packs
            if (page === 1) page = null
            if (min === 0) min = null
            if (max === 0 || max === 110) max = null
            if (sortPacks === '') sortPacks = null
            if (packName === '') packName = null
            if (!!packsSearch) packName = packsSearch
            if (user_id === '') user_id = null
            if (user_id === '') user_id = null
            const res = await packsAPI.getPacks({min, max, page, pageCount, sortPacks, packName, user_id})
            dispatch(setPacksAC(res.data))
            dispatch(setStatusApp('succeeded'))
        } catch
            (e) {
            const err = e as Error | AxiosError
            handleError(err, dispatch)
        }
    }

export const AddPackTC = (cardsPack: RequestAddPackType): AppThunk => async (dispatch) => {
    dispatch(setStatusApp('loading'))
    try {
        await packsAPI.addPack(cardsPack)
        await dispatch(SetCardsPackTC())
        dispatch(setStatusApp('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    } finally {
        dispatch(setStatusApp('idle'))
    }
}


export const UpdatePackTC = (cardsPack: RequestUpdatePackType): AppThunk => async (dispatch) => {
    dispatch(setStatusApp('loading'))
    try {
        await packsAPI.updatePack(cardsPack)
        await dispatch(SetCardsPackTC())
        dispatch(setPackNameForCardAC(cardsPack.name))
        dispatch(setStatusApp('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    } finally {
        dispatch(setStatusApp('idle'))
    }
}


export const DeletePackTC = (idPack: string): AppThunk => async (dispatch) => {
    dispatch(setStatusApp('loading'))
    try {
        await packsAPI.deletePack(idPack)
        await dispatch(SetCardsPackTC())
        dispatch(setPacksIdAC(''))
        dispatch(setStatusApp('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError
        handleError(err, dispatch)
    } finally {
        dispatch(setStatusApp('idle'))
    }
}

