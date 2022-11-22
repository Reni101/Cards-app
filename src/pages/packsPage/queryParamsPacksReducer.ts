import {AppThunk} from "../../Redux/Store";
import {setCardsPackTC} from "./packsReducer";


export type ActionsQueryPacksType =

    | ReturnType<typeof changePageAC>
    | ReturnType<typeof changeMinAC>
    | ReturnType<typeof changeMaxAC>
    | ReturnType<typeof changePageCountAC>
    | ReturnType<typeof changeSortPacksAC>
    | ReturnType<typeof sortPacksNameAC>
    | ReturnType<typeof changeShowMyPacksAC>

type InitialStateType = {
    page: number | null
    min: number | null,
    max: number | null,
    pageCount: 5 | 10
    sortPacks: string | null
    packName: string | null
    user_id: string | null

}

const initialState: InitialStateType = {
    //query params
    page: null, //  страница страница для квери параметров
    min: null,//квери параметр покажи колоды с минимальным колличеством коллод
    max: null,//квери параметр покажи колоды с максиммальным колличеством коллод
    pageCount: 10, // количество колод в на странице
    sortPacks: null, // сортировка по возрастанию / убыванию
    packName: null, //сортировка по имени
    user_id: null // сортировка мои/чужие колоды
}


export const QueryParamsPacksReducer = (state: InitialStateType = initialState, action: ActionsQueryPacksType): InitialStateType => {
    switch (action.type) {
        case "CHANGE_PAGE":
            return {...state, page: action.payload.page}
        case "CHANGE_MIN":
            return {...state, min: action.payload.min}
        case "CHANGE_MAX":
            return {...state, max: action.payload.max}
        case "CHANGE_PAGE_COUNT":
            return {...state, pageCount: action.payload.pageCount}
        case "CHANGE_SORT_PACK":
            return {...state, sortPacks: action.payload.sortPacks}
        case "SORT_PACKS_NAME":
            return {...state, packName: action.payload.packName}
        case "CHANGE_SHOW_MY_PACKS":
            return {...state, user_id: action.payload.user_id}

        default:
            return state
    }
}
//=============================AC======================================

export const changePageAC = (page: number | null) => ({
    type: "CHANGE_PAGE",
    payload: {
        page
    }
} as const)
export const changeMinAC = (min: number | null) => ({
    type: "CHANGE_MIN",
    payload: {
        min
    }
} as const)
export const changeMaxAC = (max: number | null) => ({
    type: "CHANGE_MAX",
    payload: {
        max
    }
} as const)
export const changePageCountAC = (pageCount: 5 | 10) => ({
    type: "CHANGE_PAGE_COUNT",
    payload: {
        pageCount
    }
} as const)
export const changeSortPacksAC = (sortPacks: string | null) => ({
    type: "CHANGE_SORT_PACK",
    payload: {
        sortPacks
    }
} as const)
export const sortPacksNameAC = (packName: string | null) => ({
    type: "SORT_PACKS_NAME",
    payload: {
        packName
    }
} as const)
export const changeShowMyPacksAC = (user_id: string | null) => ({
    type: "CHANGE_SHOW_MY_PACKS",
    payload: {
        user_id
    }
} as const)


//==============================TC============================

export const changePageTC = (page: number | null): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(changePageAC(page))
            await dispatch(setCardsPackTC())
        } catch
            (e) {
        }
    }

export const changeMinCardsInPackTC = (min: number | null): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(changeMinAC(min))
            await dispatch(setCardsPackTC())
        } catch
            (e) {
        }
    }
export const changeMaxCardsInPackTC = (max: number | null): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(changeMaxAC(max))
            await dispatch(setCardsPackTC())
        } catch
            (e) {
        }
    }

export const changePageCountPackTC = (pageCount: 5 | 10): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(changePageCountAC(pageCount))
            await dispatch(setCardsPackTC())
        } catch
            (e) {
        }
    }

export const changeSortPacksTC = (sortPacks: string | null): AppThunk => // ДОПИЛИТЬ!!!!
    async (dispatch) => {
        try {
            dispatch(changeSortPacksAC(sortPacks))
            await dispatch(setCardsPackTC())
        } catch
            (e) {
        }
    }

export const sortPacksNameTC = (packName: string | null): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(sortPacksNameAC(packName))
            await dispatch(setCardsPackTC())
        } catch
            (e) {
        }
    }

export const changeShowMyPacksTC = (user_id: string | null): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(changeShowMyPacksAC(user_id))
            await dispatch(setCardsPackTC())
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
            await dispatch(setCardsPackTC())
        } catch
            (e) {
        }
    }



