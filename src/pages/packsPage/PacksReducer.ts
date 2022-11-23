import {AppThunk} from "../../Redux/Store";
import {setErrorApp, setStatusApp} from "../../AppReducer";
import axios, {AxiosError} from "axios";
import {packsAPI, RequestAddPackType, RequestUpdatePackType, ResponseCardsType} from "./PacksAPI";

export type ActionsPacksType =
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof changePageAC>
    | ReturnType<typeof changeMinAC>
    | ReturnType<typeof changeMaxAC>
    | ReturnType<typeof changePageCountAC>
    | ReturnType<typeof changeSortPacksAC>
    | ReturnType<typeof sortPacksNameAC>
    | ReturnType<typeof changeShowMyPacksAC>

type PacksType = {
    _id: string // id колоды!!!
    user_id: string
    user_name: string
    private: boolean
    name: string, // название колоды
    grade: number
    shots: number
    deckCover: string
    cardsCount: number, // количество карт в колоде
    created: string, //Date
    updated: string,//Date
}



type InitialStateType = {
    cardPacks: Array<PacksType>
    query: {
        min: number | null,
        max: number | null,
        pageCount: 5 | 10
        sortPacks: string | null
        packName: string | null
        user_id: string | null
        page: number | null
    }
    cardPacksTotalCount: number | null //всего колод
    minCardsCount: number | null //мин количество карт в колоде
    maxCardsCount: number | null // макс
    //текущая страница
    // pageCount:number | null

}


const initialState: InitialStateType = {
    cardPacks: [],
    query: {
        min: null,//квери параметр покажи колоды с минимальным колличеством коллод
        max: null,//квери параметр покажи колоды с максиммальным колличеством коллод
        pageCount: 5, // количество колод в на странице
        sortPacks: null, // сортировка по возрастанию / убыванию
        packName: null, //сортировка по имени
        user_id: null,// сортировка мои/чужие колоды
        page: null,
    },
    cardPacksTotalCount: null,
    minCardsCount: null,
    maxCardsCount: null,
    // текущая страница
}


export const PacksReducer = (state: InitialStateType = initialState, action: ActionsPacksType): InitialStateType => {
    switch (action.type) {
        case 'PACKS/SET_PACKS':
            return {...state, ...action.payload.resObj}


        case "PACKS/CHANGE_PAGE":
            return {...state, query: {...state.query, page: action.payload.page}}
        case "PACKS/CHANGE_MIN":
            return {...state, query: {...state.query, min: action.payload.min}}
        case "PACKS/CHANGE_MAX":
            return {...state, query: {...state.query, max: action.payload.max}}
        case "PACKS/CHANGE_PAGE_COUNT":
            return {...state, query: {...state.query, pageCount: action.payload.pageCount}}
        case "PACKS/CHANGE_SORT_PACK":
            return {...state, query: {...state.query, sortPacks: action.payload.sortPacks}}
        case "PACKS/SORT_PACKS_NAME":
            return {...state, query: {...state.query, packName: action.payload.packName}}
        case "PACKS/CHANGE_SHOW_MY_PACKS":
            return {...state, query: {...state.query, user_id: action.payload.user_id}}
        default:
            return state
    }
}
//=============================AC======================================
export const setPacksAC = (resObj: ResponseCardsType) => ({
    type: "PACKS/SET_PACKS",
    payload: {
        resObj
    }
} as const)

export const changePageAC = (page: number | null) => ({
    type: "PACKS/CHANGE_PAGE",
    payload: {page}
} as const)

export const changeMinAC = (min: number | null) => ({
    type: "PACKS/CHANGE_MIN",
    payload: {min}
} as const)

export const changeMaxAC = (max: number | null) => ({
    type: "PACKS/CHANGE_MAX",
    payload: {max}
} as const)

export const changePageCountAC = (pageCount: 5 | 10) => ({
    type: "PACKS/CHANGE_PAGE_COUNT",
    payload: {pageCount}
} as const)

export const changeSortPacksAC = (sortPacks: string | null) => ({
    type: "PACKS/CHANGE_SORT_PACK",
    payload: {sortPacks}
} as const)

export const sortPacksNameAC = (packName: string | null) => ({
    type: "PACKS/SORT_PACKS_NAME",
    payload: {packName}
} as const)

export const changeShowMyPacksAC = (user_id: string | null) => ({
    type: "PACKS/CHANGE_SHOW_MY_PACKS",
    payload: {user_id}
} as const)


//==============================TC============================

export const setCardsPackTC = (): AppThunk =>
    async (dispatch, getState) => {
        try {
            const {min, max, page, pageCount, sortPacks, packName, user_id} = getState().Packs.query
            const res = await packsAPI.getPacks({min, max, page, pageCount, sortPacks, packName, user_id})
            dispatch(setPacksAC(res.data))
        } catch
            (e) {

        }
    }

export const changePageTC = (page: number | null): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(changePageAC(page))

        } catch
            (e) {
        }
    }

export const changeMinCardsInPackTC = (min: number | null): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(changeMinAC(min))

        } catch
            (e) {
        }
    }
export const changeMaxCardsInPackTC = (max: number | null): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(changeMaxAC(max))

        } catch
            (e) {
        }
    }

export const changePageCountPackTC = (pageCount: 5 | 10): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(changePageCountAC(pageCount))

        } catch
            (e) {
        }
    }

export const changeSortPacksTC = (sortPacks: string | null): AppThunk => // ДОПИЛИТЬ!!!!
    async (dispatch) => {
        try {
            dispatch(changeSortPacksAC(sortPacks))

        } catch
            (e) {
        }
    }

export const sortPacksNameTC = (packName: string | null): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(sortPacksNameAC(packName))

        } catch
            (e) {
        }
    }

export const changeShowMyPacksTC = (user_id: string | null): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(changeShowMyPacksAC(user_id))

        } catch
            (e) {
        }
    }
export const ResetAllQueryParamsTC = (): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(changePageAC(null))
            dispatch(changeMinAC(null))
            dispatch(changeMaxAC(null))
            dispatch(changePageCountAC(10))
            dispatch(changeSortPacksAC(null))
            dispatch(sortPacksNameAC(null))
            dispatch(changeShowMyPacksAC(null))

        } catch
            (e) {
        }
    }
export const AddPackTC = (cardsPack: RequestAddPackType): AppThunk => async (dispatch) => {
    dispatch(setStatusApp('loading'))
    try {
        await packsAPI.addPack(cardsPack)
        dispatch(setCardsPackTC())
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
        await packsAPI.updatePack(cardsPack)
        dispatch(setCardsPackTC())
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
        await packsAPI.deletePack(idPack)
        dispatch(setCardsPackTC())
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
